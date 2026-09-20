import { useEffect, useRef, useState } from 'react'

// All coordinates are percentages of the full hero-mockup.jpg image
// (1536×1024), hand-measured against the actual photo's monitor/tablet/
// phone positions. If the composite ever looks slightly off after a real
// device test, these are the numbers to nudge.

const MONITOR_LEFT = { left: 2.7, top: 3.4, width: 28.75, height: 50.8 }
const MONITOR_RIGHT = { left: 31.45, top: 3.4, width: 28.75, height: 50.8 }
const TABLET_HOTSPOT = { left: 62.5, top: 28.8, width: 21.5, height: 38.1 }

// The phone sits at a clear angle in the photo, so it needs a real 4-point
// perspective warp rather than a straight rectangle — these are its four
// screen corners, clockwise from top-left, as % of the full image.
const PHONE_CORNERS = [
  { x: 61.69, y: 73.0 }, // top-left
  { x: 71.45, y: 75.4 }, // top-right
  { x: 69.8, y: 90.8 }, // bottom-right
  { x: 60.4, y: 87.6 }, // bottom-left
]

// Standard unit-square → quadrilateral projective mapping. Given four
// destination points for (0,0) (1,0) (1,1) (0,1), returns the 3×3
// homography as a CSS matrix3d() string. This is what lets a plain video
// element sit convincingly inside a photographed surface at an angle.
function quadMatrix3d(pts) {
  const [p0, p1, p2, p3] = pts
  const dx1 = p1.x - p2.x
  const dx2 = p3.x - p2.x
  const dx3 = p0.x - p1.x + p2.x - p3.x
  const dy1 = p1.y - p2.y
  const dy2 = p3.y - p2.y
  const dy3 = p0.y - p1.y + p2.y - p3.y

  let a, b, c, d, e, f, g, h
  if (Math.abs(dx3) < 1e-9 && Math.abs(dy3) < 1e-9) {
    a = p1.x - p0.x
    b = p2.x - p1.x
    c = p0.x
    d = p1.y - p0.y
    e = p2.y - p1.y
    f = p0.y
    g = 0
    h = 0
  } else {
    const denom = dx1 * dy2 - dx2 * dy1
    g = (dx3 * dy2 - dx2 * dy3) / denom
    h = (dx1 * dy3 - dx3 * dy1) / denom
    a = p1.x - p0.x + g * p1.x
    b = p3.x - p0.x + h * p3.x
    c = p0.x
    d = p1.y - p0.y + g * p1.y
    e = p3.y - p0.y + h * p3.y
    f = p0.y
  }

  return `matrix3d(${a},${d},0,${g}, ${b},${e},0,${h}, 0,0,1,0, ${c},${f},0,1)`
}

function LoopingVideo({ src, className, style }) {
  const ref = useRef(null)
  useEffect(() => {
    ref.current?.play().catch(() => {
      /* autoplay can be blocked before interaction — fine, first frame still shows */
    })
  }, [])
  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      autoPlay
      className={className}
      style={style}
    />
  )
}

export default function PhotoShowcase({ projects, onSelect }) {
  const containerRef = useRef(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight })
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const phonePixelCorners = PHONE_CORNERS.map((p) => ({
    x: (p.x / 100) * size.w,
    y: (p.y / 100) * size.h,
  }))
  const phoneMatrix =
    size.w > 0 ? quadMatrix3d(phonePixelCorners) : 'none'

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-4xl">
      <img
        src="/images/hero/hero-mockup.jpg"
        alt="Supreme Gate, Career Builder Schools and Hosanna Help Foundation on a monitor, tablet and phone"
        className="w-full rounded-2xl"
        draggable={false}
      />

      {/* Monitor — left half: Supreme Gate */}
      <button
        onClick={() => onSelect?.(projects[0])}
        className="absolute overflow-hidden rounded-[2px] outline-none"
        style={{
          left: `${MONITOR_LEFT.left}%`,
          top: `${MONITOR_LEFT.top}%`,
          width: `${MONITOR_LEFT.width}%`,
          height: `${MONITOR_LEFT.height}%`,
        }}
        aria-label="Open Supreme Gate details"
      >
        <LoopingVideo
          src="/videos/supreme-gate.mp4"
          className="h-full w-full object-cover"
        />
      </button>

      {/* Monitor — right half: Career Builder Schools */}
      <button
        onClick={() => onSelect?.(projects[1])}
        className="absolute overflow-hidden rounded-[2px] outline-none"
        style={{
          left: `${MONITOR_RIGHT.left}%`,
          top: `${MONITOR_RIGHT.top}%`,
          width: `${MONITOR_RIGHT.width}%`,
          height: `${MONITOR_RIGHT.height}%`,
        }}
        aria-label="Open Career Builder Schools details"
      >
        <LoopingVideo
          src="/videos/career-builder-schools.mp4"
          className="h-full w-full object-cover"
        />
      </button>

      {/* Tablet — stays static (untouched photo content), just a tap target */}
      <button
        onClick={() => onSelect?.(projects[2])}
        className="absolute outline-none"
        style={{
          left: `${TABLET_HOTSPOT.left}%`,
          top: `${TABLET_HOTSPOT.top}%`,
          width: `${TABLET_HOTSPOT.width}%`,
          height: `${TABLET_HOTSPOT.height}%`,
        }}
        aria-label="Open Hosanna Help Foundation details"
      />

      {/* Phone — perspective-warped to the photo's actual angle */}
      {size.w > 0 && (
        <button
          onClick={() => onSelect?.(projects[0])}
          className="absolute left-0 top-0 h-px w-px overflow-visible outline-none"
          style={{ transform: phoneMatrix, transformOrigin: '0 0' }}
          aria-label="Open Supreme Gate details"
        >
          <LoopingVideo
            src="/videos/supreme-gate.mp4"
            className="h-full w-full object-cover"
          />
        </button>
      )}
    </div>
  )
}
