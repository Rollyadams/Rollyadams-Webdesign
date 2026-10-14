import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'

// Timing of one project's "turn" in the card (ms)
const EXPAND_AFTER = 1800 // small tile -> grows and starts scrolling
const NEXT_AFTER = 6200 // swap to the next project

const TILE_SMALL = {
  width: '44%',
  height: '64%',
  right: '7%',
  top: '18%',
  borderRadius: 24,
}
const TILE_LARGE = {
  width: '66%',
  height: '94%',
  right: '-5%',
  top: '3%',
  borderRadius: 28,
}

export default function ProjectShowcase({ projects, onSelect }) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const rootRef = useRef(null)

  const project = projects[index]

  // Only run the cycle while the card is actually on screen
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // One project's turn: small tile -> expand -> next project
  useEffect(() => {
    setExpanded(false)
    if (paused || !inView) return
    const t1 = setTimeout(() => setExpanded(true), EXPAND_AFTER)
    const t2 = setTimeout(
      () => setIndex((i) => (i + 1) % projects.length),
      NEXT_AFTER
    )
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [index, paused, inView, projects.length])

  const go = (dir) =>
    setIndex((i) => (i + dir + projects.length) % projects.length)

  return (
    <div
      ref={rootRef}
      className="relative mx-auto w-full max-w-4xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[300px] overflow-hidden rounded-3xl border border-line bg-white shadow-sm md:h-[420px]">
        {/* Soft top notch, like the reference */}
        <div className="absolute left-1/2 top-0 h-3 w-20 -translate-x-1/2 rounded-b-2xl bg-line/60 md:w-28" />

        {/* Left: project name, one-liner, actions */}
        <div className="absolute inset-y-0 left-0 flex w-[44%] flex-col justify-center pl-5 pr-2 md:pl-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <span className="text-[11px] font-semibold text-gold md:text-xs">
                {project.tag}
              </span>
              <h4 className="font-display mt-1 text-base font-bold leading-snug text-ink md:text-2xl">
                {project.title}
              </h4>
              <p className="mt-1 text-xs leading-snug text-muted md:mt-2 md:text-base">
                {project.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => onSelect?.(project)}
              aria-label={`Open ${project.title} details`}
              className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-paper text-ink transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowUpRight size={15} />
            </button>
            <button
              onClick={() => go(-1)}
              aria-label="Previous project"
              className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-paper text-ink transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next project"
              className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-paper text-ink transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* Right: the tile. Small tile -> grows, bleeds off the edge, scrolls */}
        <motion.button
          onClick={() => onSelect?.(project)}
          aria-label={`Open ${project.title} details`}
          initial={false}
          animate={expanded && !reduce ? TILE_LARGE : TILE_SMALL}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute overflow-hidden bg-ink shadow-xl shadow-ink/20 outline-none"
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={project.img}
              src={project.img}
              alt={project.title}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{
                opacity: 1,
                scale: 1,
                objectPosition: expanded && !reduce ? '50% 100%' : '50% 0%',
              }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.5 },
                scale: { duration: 0.7, ease: 'easeOut' },
                // slow, steady "scroll through the page" while expanded
                objectPosition: expanded
                  ? { duration: (NEXT_AFTER - EXPAND_AFTER) / 1000, ease: 'linear' }
                  : { duration: 0.6 },
              }}
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
        </motion.button>

        {/* Progress segments */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1.5">
          {projects.map((p, i) => (
            <button
              key={p.title}
              onClick={() => setIndex(i)}
              aria-label={`Show ${p.title}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-6 bg-gold' : 'w-1.5 bg-ink/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}