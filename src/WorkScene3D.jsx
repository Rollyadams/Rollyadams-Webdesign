import { useEffect, useRef } from 'react'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight,
  TextureLoader,
  PlaneGeometry,
  MeshStandardMaterial,
  Mesh,
  DoubleSide,
  SRGBColorSpace,
  Raycaster,
  Vector2,
} from 'three'

// Loose hand-placed positions so panels don't feel like a grid —
// alternating sides and depths as the camera moves through.
const LAYOUT = [
  { x: -1.5, y: 0.35, z: 0 },
  { x: 1.6, y: -0.3, z: -3.4 },
  { x: -1.3, y: -0.55, z: -6.8 },
]

const PANEL_W = 1.5
const PANEL_ASPECT = 19 / 9 // matches the real screenshot aspect ratio

export default function WorkScene3D({ projects, onSelect }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let width = mount.clientWidth
    let height = mount.clientHeight || 1

    const scene = new Scene()
    const camera = new PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 4)

    const renderer = new WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.setSize(width, height)
    renderer.outputColorSpace = SRGBColorSpace
    mount.appendChild(renderer.domElement)

    scene.add(new AmbientLight(0xffffff, 0.95))
    const dirLight = new DirectionalLight(0xffffff, 0.55)
    dirLight.position.set(2, 3, 5)
    scene.add(dirLight)

    const loader = new TextureLoader()
    const meshes = []

    projects.forEach((p, i) => {
      const pos = LAYOUT[i % LAYOUT.length]
      const geo = new PlaneGeometry(PANEL_W, PANEL_W * PANEL_ASPECT)

      // Flat brand-ink placeholder so the panel exists immediately —
      // texture swaps in once it loads, never a blank/broken frame.
      const mat = new MeshStandardMaterial({
        color: 0x15130f,
        roughness: 0.65,
        metalness: 0.05,
        side: DoubleSide,
      })

      const mesh = new Mesh(geo, mat)
      mesh.position.set(pos.x, pos.y, pos.z)
      mesh.userData.project = p
      scene.add(mesh)
      meshes.push(mesh)

      loader.load(
        p.img,
        (tex) => {
          tex.colorSpace = SRGBColorSpace
          mat.map = tex
          mat.color.set(0xffffff)
          mat.needsUpdate = true
        },
        undefined,
        () => {
          /* texture failed to load — keep the flat panel, fail quietly */
        }
      )
    })

    let scrollProgress = 0
    let targetProgress = 0

    function readScroll() {
      const rect = mount.getBoundingClientRect()
      const total = rect.height + window.innerHeight
      const passed = window.innerHeight - rect.top
      targetProgress = Math.min(Math.max(passed / total, 0), 1)
    }
    readScroll()
    window.addEventListener('scroll', readScroll, { passive: true })

    let rafId
    function tick() {
      scrollProgress += (targetProgress - scrollProgress) * 0.08
      camera.position.z = 4 - scrollProgress * 11
      camera.rotation.y = Math.sin(scrollProgress * Math.PI) * 0.07

      const t = performance.now() * 0.0002
      meshes.forEach((m) => {
        m.rotation.y = Math.sin(t + m.position.x) * 0.05
      })

      renderer.render(scene, camera)
      rafId = requestAnimationFrame(tick)
    }
    tick()

    function handleResize() {
      width = mount.clientWidth
      height = mount.clientHeight || 1
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', handleResize)

    const raycaster = new Raycaster()
    const pointer = new Vector2()

    function handlePointerUp(e) {
      const rect = renderer.domElement.getBoundingClientRect()
      const clientX = e.clientX ?? e.changedTouches?.[0]?.clientX
      const clientY = e.clientY ?? e.changedTouches?.[0]?.clientY
      if (clientX == null || clientY == null) return
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(pointer, camera)
      const hits = raycaster.intersectObjects(meshes)
      if (hits.length > 0) {
        onSelect?.(hits[0].object.userData.project)
      }
    }
    renderer.domElement.addEventListener('pointerup', handlePointerUp)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', readScroll)
      window.removeEventListener('resize', handleResize)
      renderer.domElement.removeEventListener('pointerup', handlePointerUp)
      meshes.forEach((m) => {
        m.geometry.dispose()
        m.material.map?.dispose()
        m.material.dispose()
      })
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [projects, onSelect])

  return <div ref={mountRef} className="h-full w-full cursor-pointer" />
}
