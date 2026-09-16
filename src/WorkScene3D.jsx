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

// Kept close to center on X so every panel stays inside the camera's
// field of view as it passes — nothing should ever clip off-frame.
const LAYOUT = [
  { x: -0.45, y: 0.25, z: 0 },
  { x: 0.5, y: -0.2, z: -4.5 },
  { x: -0.4, y: -0.3, z: -9 },
]

const PANEL_W = 1.6
const PANEL_ASPECT = 19 / 9 // matches the real screenshot aspect ratio
const CAMERA_START_Z = 5
const CAMERA_END_Z = -12

export default function WorkScene3D({ projects, onSelect }) {
  const wrapperRef = useRef(null) // tall scroll-distance element
  const mountRef = useRef(null) // sticky-pinned canvas container

  useEffect(() => {
    const wrapper = wrapperRef.current
    const mount = mountRef.current
    if (!wrapper || !mount) return

    let width = mount.clientWidth
    let height = mount.clientHeight || 1

    const scene = new Scene()
    const camera = new PerspectiveCamera(50, width / height, 0.1, 100)
    camera.position.set(0, 0, CAMERA_START_Z)

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

    // ---- Scroll progress, calibrated against the TALL wrapper, not the
    // sticky viewport slice — this is what fixes the "front-loaded" bug:
    // progress now advances evenly across the wrapper's own extra height,
    // while the canvas itself stays pinned on screen the whole time.
    let scrollProgress = 0
    let targetProgress = 0

    function readScroll() {
      const rect = wrapper.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      if (scrollable <= 0) {
        targetProgress = 0
        return
      }
      targetProgress = Math.min(Math.max(-rect.top / scrollable, 0), 1)
    }
    readScroll()
    window.addEventListener('scroll', readScroll, { passive: true })

    let rafId
    function tick() {
      scrollProgress += (targetProgress - scrollProgress) * 0.1
      camera.position.z =
        CAMERA_START_Z + scrollProgress * (CAMERA_END_Z - CAMERA_START_Z)

      const t = performance.now() * 0.0002
      meshes.forEach((m) => {
        m.rotation.y = Math.sin(t + m.position.x) * 0.04
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

    // ---- Tap-to-select. Uses the browser's synthesized `click` event,
    // not raw pointerup — click only fires for a genuine tap and is
    // automatically suppressed if the same touch turned into a scroll,
    // which is what silently broke selection on mobile before.
    const raycaster = new Raycaster()
    const pointer = new Vector2()

    function handleClick(e) {
      const rect = renderer.domElement.getBoundingClientRect()
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(pointer, camera)
      const hits = raycaster.intersectObjects(meshes)
      if (hits.length > 0) {
        onSelect?.(hits[0].object.userData.project)
      }
    }
    renderer.domElement.addEventListener('click', handleClick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', readScroll)
      window.removeEventListener('resize', handleResize)
      renderer.domElement.removeEventListener('click', handleClick)
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

  return (
    <div ref={wrapperRef} className="relative h-[280vh]">
      <div
        ref={mountRef}
        className="sticky top-0 h-[65vh] w-full cursor-pointer md:h-[80vh]"
      />
    </div>
  )
}
