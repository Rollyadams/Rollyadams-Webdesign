import { useEffect, useRef } from 'react'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight,
  TextureLoader,
  VideoTexture,
  PlaneGeometry,
  MeshStandardMaterial,
  Mesh,
  Group,
  DoubleSide,
  SRGBColorSpace,
  Raycaster,
  Vector2,
} from 'three'

const PANEL_ASPECT = 19 / 9 // matches the real screenshot/recording aspect ratio
const CAMERA_START_Z = 5
const CAMERA_END_Z = -12

// Placeholder color shown before a texture (image or first video frame) is ready.
const PLACEHOLDER_COLOR = 0x15130f

function makePlaceholderMaterial() {
  return new MeshStandardMaterial({
    color: PLACEHOLDER_COLOR,
    roughness: 0.65,
    metalness: 0.05,
    side: DoubleSide,
  })
}

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
    const camera = new PerspectiveCamera(52, width / height, 0.1, 100)
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

    const textureLoader = new TextureLoader()
    const meshes = [] // every raycast-able mesh, each tagged with userData.project
    const videos = [] // every <video> element, for cleanup + pause/play

    function addVideoPanel(group, videoSrc, w, h, project) {
      const video = document.createElement('video')
      video.src = videoSrc
      video.loop = true
      video.muted = true
      video.playsInline = true
      video.crossOrigin = 'anonymous'
      video.play().catch(() => {
        /* autoplay can be blocked before any user interaction — harmless, stays on first frame */
      })
      videos.push(video)

      const texture = new VideoTexture(video)
      texture.colorSpace = SRGBColorSpace

      const mat = new MeshStandardMaterial({
        map: texture,
        roughness: 0.65,
        metalness: 0.05,
        side: DoubleSide,
      })
      const mesh = new Mesh(new PlaneGeometry(w, h), mat)
      mesh.userData.project = project
      group.add(mesh)
      meshes.push(mesh)
      return mesh
    }

    function addImagePanel(group, imgSrc, w, h, project) {
      const mat = makePlaceholderMaterial()
      const mesh = new Mesh(new PlaneGeometry(w, h), mat)
      mesh.userData.project = project
      group.add(mesh)
      meshes.push(mesh)

      textureLoader.load(
        imgSrc,
        (tex) => {
          tex.colorSpace = SRGBColorSpace
          mat.map = tex
          mat.color.set(0xffffff)
          mat.needsUpdate = true
        },
        undefined,
        () => {
          /* image failed to load — keep the flat placeholder, fail quietly */
        }
      )
      return mesh
    }

    // ---- Panel 1: PHONE — Supreme Gate, single looping recording ----
    const phoneGroup = new Group()
    phoneGroup.position.set(-0.45, 0.25, 0)
    addVideoPanel(phoneGroup, '/videos/supreme-gate.mp4', 1.5, 1.5 * PANEL_ASPECT, projects[0])
    scene.add(phoneGroup)

    // ---- Panel 2: LAPTOP — Supreme Gate + Career Builder Schools side by side,
    // one wide "screen" made of two independent looping recordings. Both halves
    // link to the same project (Career Builder Schools) when tapped.
    const laptopGroup = new Group()
    laptopGroup.position.set(0.5, -0.2, -4.5)
    const subW = 0.85
    const subH = subW * PANEL_ASPECT
    const gap = 0.12
    const leftMesh = addVideoPanel(
      laptopGroup,
      '/videos/supreme-gate.mp4',
      subW,
      subH,
      projects[1]
    )
    leftMesh.position.x = -(subW / 2 + gap / 2)
    const rightMesh = addVideoPanel(
      laptopGroup,
      '/videos/career-builder-schools.mp4',
      subW,
      subH,
      projects[1]
    )
    rightMesh.position.x = subW / 2 + gap / 2
    scene.add(laptopGroup)

    // ---- Panel 3: IPAD — HHF CareConnect, static image (as agreed, no video yet) ----
    const ipadGroup = new Group()
    ipadGroup.position.set(-0.4, -0.3, -9)
    addImagePanel(ipadGroup, projects[2].img, 1.5, 1.5 * PANEL_ASPECT, projects[2])
    scene.add(ipadGroup)

    const allGroups = [phoneGroup, laptopGroup, ipadGroup]

    // ---- Scroll progress, calibrated against the TALL wrapper — the canvas
    // stays pinned (sticky) on screen while scroll maps evenly to camera travel.
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
      allGroups.forEach((g) => {
        g.rotation.y = Math.sin(t + g.position.x) * 0.04
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

    // Pause all video decoding when the tab isn't visible — real battery/data cost otherwise.
    function handleVisibility() {
      if (document.hidden) {
        videos.forEach((v) => v.pause())
      } else {
        videos.forEach((v) => v.play().catch(() => {}))
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    // ---- Tap-to-select via the browser's `click` event (not raw pointerup) —
    // click only fires for a genuine tap and is automatically suppressed if the
    // same touch turned into a scroll, which is what broke selection before.
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
      document.removeEventListener('visibilitychange', handleVisibility)
      renderer.domElement.removeEventListener('click', handleClick)
      videos.forEach((v) => {
        v.pause()
        v.src = ''
        v.load()
      })
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
