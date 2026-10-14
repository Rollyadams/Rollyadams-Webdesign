import { useEffect, useRef, useState } from 'react'
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

// Layout variety: each phone gets its own size, vertical offset and tilt,
// so the grid never reads as rows of identical phones.
const SIZES = ['w-32 sm:w-36', 'w-28 sm:w-32', 'w-28 sm:w-32', 'w-32 sm:w-40']
const OFFSETS = [
  'mt-0 lg:mt-0',
  'mt-12 lg:mt-12',
  'mt-0 lg:mt-5',
  'mt-12 lg:mt-16',
]
const MAX_TILT = [26, 32, 20, 28] // degrees of 3D turn at the edges of the screen
const LEAN = [3, -4, 5, -3] // static sideways lean, degrees
const AUTO_SPIN = new Set([1, 4, 6]) // these three do one full 360° on entering view

function PhoneCard({ project, index, onSelect, reduce }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.7 })
  const [back, setBack] = useState(false)

  const dir = index % 2 === 0 ? 1 : -1
  const tilt = MAX_TILT[index % 4]
  const lean = LEAN[index % 4]

  // Scroll-linked swing: tilted one way when entering, level at centre, other way leaving
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'end 0.05'],
  })
  const swingY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduce ? [0, 0, 0] : [dir * tilt, 0, -dir * tilt]
  )
  const swingX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduce ? [0, 0, 0] : [10, 0, -8]
  )

  // `turn` carries flips and 360° spins; it adds on top of the scroll swing
  const turn = useMotionValue(0)
  const rotateY = useTransform([swingY, turn], ([s, t]) => s + t)

  // Shadow slides opposite to the tilt so the phone feels like it hovers
  const shadowX = useTransform(swingY, [-tilt, tilt], [16, -16])

  // One full turn when the phone first scrolls into view (3 of the 8)
  useEffect(() => {
    if (reduce || !inView || !AUTO_SPIN.has(index)) return
    const controls = animate(turn, turn.get() + 360, {
      duration: 1.6,
      delay: 0.25,
      ease: [0.4, 0, 0.2, 1],
    })
    return () => controls.stop()
  }, [inView, reduce, index, turn])

  // Tap: half-turn to show the back (project info + button), tap again to return
  const flip = () => {
    setBack((b) => !b)
    animate(turn, turn.get() + 180, {
      duration: reduce ? 0.01 : 0.8,
      ease: [0.4, 0, 0.2, 1],
    })
  }

  return (
    <div className={`${OFFSETS[index % 4]} text-center`}>
      <div
        ref={ref}
        className={`relative mx-auto ${SIZES[index % 4]}`}
        style={{ perspective: 900 }}
      >
        {/* Floating bob */}
        <motion.div
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={{
            duration: 5 + (index % 4) * 0.7,
            delay: index * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            style={{
              rotateY,
              rotateX: swingX,
              rotateZ: reduce ? 0 : lean,
              transformStyle: 'preserve-3d',
            }}
            className="relative aspect-[9/19]"
          >
            {/* Front face */}
            <button
              onClick={flip}
              aria-label={`Flip ${project.title} to see details`}
              className={`absolute inset-0 overflow-hidden rounded-[1.4rem] border-[5px] border-ink bg-white shadow-xl outline-none ${
                back ? 'pointer-events-none' : ''
              }`}
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="absolute left-1/2 top-1 z-10 h-2.5 w-14 -translate-x-1/2 rounded-full bg-ink" />
              <img
                src={project.img}
                alt={project.title}
                loading="lazy"
                draggable={false}
                className="h-full w-full object-cover object-top"
              />
            </button>

            {/* Back face: shows when the phone is flipped */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center rounded-[1.4rem] border-[5px] border-ink bg-ink px-3 text-center shadow-xl ${
                back ? '' : 'pointer-events-none'
              }`}
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <span className="text-[10px] font-semibold text-gold">
                {project.tag}
              </span>
              <h4 className="font-display mt-1 text-sm font-bold leading-snug text-white">
                {project.title}
              </h4>
              <p className="mt-1 text-[10px] leading-snug text-slate-300">
                {project.subtitle}
              </p>
              <button
                onClick={() => onSelect?.(project)}
                className="mt-3 inline-flex items-center gap-1 rounded-md bg-gold px-2.5 py-1.5 text-[11px] font-semibold text-white"
              >
                View <ArrowUpRight size={12} />
              </button>
              <button
                onClick={flip}
                className="mt-2 text-[10px] text-slate-400 underline underline-offset-2"
              >
                Flip back
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Soft ground shadow */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-5 flex justify-center">
          <motion.div
            style={{ x: reduce ? 0 : shadowX }}
            className="h-3 w-4/5 rounded-full bg-ink/25 blur-md"
          />
        </div>
      </div>

      <div className="mt-8">
        <span className="text-[11px] font-semibold text-gold">{project.tag}</span>
        <h4 className="font-display mt-1 font-bold">{project.title}</h4>
        <p className="mx-auto mt-1 max-w-[12rem] text-sm text-muted">
          {project.subtitle}
        </p>
      </div>
    </div>
  )
}

export default function ArchivePhones({ projects, onSelect }) {
  const reduce = useReducedMotion()
  return (
    <div className="mx-auto grid grid-cols-2 gap-x-6 gap-y-14 pb-16 lg:grid-cols-4 lg:gap-x-8">
      {projects.map((p, i) => (
        <PhoneCard
          key={p.title}
          project={p}
          index={i}
          onSelect={onSelect}
          reduce={reduce}
        />
      ))}
    </div>
  )
}