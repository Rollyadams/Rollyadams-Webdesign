import { useState, useRef, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import {
  Menu,
  X,
  ArrowRight,
  CalendarClock,
  ArrowUpRight,
  ChevronDown,
  Mail,
  Send,
} from 'lucide-react'

import PhotoShowcase from './PhotoShowcase'
import ProjectShowcase from './ProjectShowcase'

/* ============ BOOKING (Calendly) ============ */
// Calendly booking link
const BOOKING_LINK = 'https://calendly.com/rollyadamstechworld/30min'

// Opens the Calendly popup. If the Calendly script hasn't loaded
// (ad-blocker, slow network), it falls back to opening the link in a new tab.
const openBooking = (e) => {
  if (e) e.preventDefault()
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: BOOKING_LINK })
  } else {
    window.open(BOOKING_LINK, '_blank', 'noopener,noreferrer')
  }
}

/* ============ COUNTER ANIMATION ============ */
function StatNumber({ to }) {
  const ref = useRef(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 80 })
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(to)
    }
  }, [motionValue, isInView, to])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest)
      }
    })
    return unsubscribe
  }, [springValue])

  return <span ref={ref}>0</span>
}

/* ============ NAVBAR ============ */
const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Work', href: '#work' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper/80 backdrop-blur-md border-b border-line">
      <nav className="container-max flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold font-display text-white font-bold">
            R
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Rollyadams <span className="text-gold">WebStudio</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-ink transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href={BOOKING_LINK}
            onClick={openBooking}
            className="rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-gold/30 transition-all hover:bg-gold-dark hover:-translate-y-0.5"
          >
            Book a Call
          </a>
        </div>

        <button
          className="md:hidden text-ink"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-line bg-paper px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-muted hover:text-ink"
            >
              {link.name}
            </a>
          ))}
          <a
            href={BOOKING_LINK}
            onClick={(e) => { setOpen(false); openBooking(e) }}
            className="rounded-lg bg-gold px-5 py-3 text-center text-sm font-semibold text-white"
          >
            Book a Call
          </a>
        </div>
      )}
    </header>
  )
}

/* ============ HERO — annotated workshop wall ============ */
const heroContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const heroItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const heroImages = [
  {
    src: '/images/hero/hero-mockup.jpg',
    alt: 'Supreme Gate, Hosanna Help Foundation and School Resource Center shown on desktop, tablet and phone',
  },
  {
    src: '/images/hero/hero-desk.jpg',
    alt: 'Developer desk setup with monitor and keyboard',
  },
  {
    src: '/images/hero/hero-code.jpg',
    alt: 'Close-up of code on screen',
  },
]

function Hero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative flex min-h-[600px] items-center overflow-hidden md:min-h-[720px]">
      {/* Crossfading background photos */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.img
            key={heroImages[active].src}
            src={heroImages[active].src}
            alt={heroImages[active].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 h-full w-full scale-105 object-cover object-top blur-[3px]"
          />
        </AnimatePresence>
        {/* Scrim for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/80 to-ink/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
      </div>

      <div className="container-max relative z-10 flex flex-col items-center px-6 py-28 text-center md:px-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 rounded-full border border-white/30 bg-ink/60 px-4 py-1.5 text-sm font-medium text-white backdrop-blur"
        >
          Product design & engineering, built and shipped in-house
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl [text-shadow:0_2px_16px_rgba(0,0,0,0.6)]"
        >
          We design it. We build it.{' '}
          <span className="text-gold">It ships.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 max-w-2xl text-lg font-medium text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.8)] md:text-xl"
        >
          Election intelligence platforms. School management systems. AI
          content tools. Support portals. Designed and built in-house, end
          to end.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#work"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-8 py-4 text-base font-semibold text-white shadow-lg shadow-gold/30 transition-all hover:bg-gold-dark hover:-translate-y-0.5"
          >
            See what we've shipped <ArrowRight size={18} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 bg-ink/60 px-8 py-4 text-base font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
          >
            <CalendarClock size={18} /> Talk to a designer
          </a>
        </motion.div>

        {/* Slide indicators */}
        <div className="mt-14 flex gap-2">
          {heroImages.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setActive(i)}
              aria-label={`Show slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? 'w-8 bg-gold' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ MANIFESTO ============ */
/* ============ TRUST STRIP — real names, not logos we don't have yet ============ */
const trustLogos = [
  { src: '/images/logos/supreme-gate.jpg', name: 'Supreme Gate' },
  { src: '/images/logos/career-builder-schools.jpg', name: 'Career Builder Schools' },
  { src: '/images/logos/hhf.jpg', name: 'Hosanna Help Foundation' },
  { src: '/images/logos/src.jpg', name: 'School Resource Center' },
  { src: '/images/logos/attendai.jpg', name: 'AttendAI' },
]

function TrustStrip() {
  const loop = [...trustLogos, ...trustLogos]

  return (
    <div className="border-y border-line bg-white py-8">
      <div className="marquee overflow-hidden">
        <div className="marquee-track items-center gap-6 md:gap-10">
          {loop.map((logo, i) => (
            <div
              key={`${logo.src}-${i}`}
              className="flex w-32 shrink-0 flex-col items-center gap-2 md:w-36"
            >
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border border-line bg-paper p-2 md:h-24 md:w-24">
                <img
                  src={logo.src}
                  alt={logo.name}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-center text-xs font-medium text-muted">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const manifestoScreens = [
  {
    src: '/images/sg-home.jpg',
    pos: 'left-[-2.5rem] top-8 md:left-[4%] md:top-14',
    rotate: -8,
    range: [50, -50],
    float: 7,
  },
  {
    src: '/images/cbs-home.jpg',
    pos: 'right-[-3rem] top-24 md:right-[4%] md:top-28',
    rotate: 7,
    range: [80, -80],
    float: 9,
  },
  {
    src: '/images/src-dashboard.jpg',
    pos: 'left-[-2rem] bottom-10 md:left-[7%] md:bottom-12',
    rotate: 6,
    range: [90, -40],
    float: 8,
  },
  {
    src: '/images/attendai-login.jpg',
    pos: 'right-[-2.5rem] bottom-6 md:right-[8%] md:bottom-16',
    rotate: -6,
    range: [40, -90],
    float: 10,
  },
]

const liveProducts = [
  'Supreme Gate',
  'Career Builder Schools',
  'HHF CareConnect',
  'School Resource Center',
  'AttendAI',
]

const manifestoWords = [
  'From', 'the', 'idea', 'in', 'your', 'head', 'to', 'the', 'product', 'in', 'your',
]

const headlineParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

const headlineWord = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

function FloatingScreen({ screen, progress, reduce }) {
  const y = useTransform(progress, [0, 1], screen.range)
  return (
    <motion.div
      style={{ y: reduce ? 0 : y, rotate: screen.rotate }}
      className={`pointer-events-none absolute w-40 md:w-60 ${screen.pos}`}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -14, 0] }}
        transition={{ duration: screen.float, repeat: Infinity, ease: 'easeInOut' }}
        className="overflow-hidden rounded-xl border border-white/15 bg-ink opacity-30 shadow-2xl shadow-black/60 md:opacity-50"
      >
        <div className="flex gap-1 border-b border-white/10 bg-white/5 px-2.5 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
        </div>
        <img
          src={screen.src}
          alt=""
          loading="lazy"
          className="aspect-[4/3] w-full object-cover object-top"
        />
      </motion.div>
    </motion.div>
  )
}

function Manifesto() {
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const drift = (x, y, duration) =>
    reduce
      ? undefined
      : {
          animate: { x: [0, x, -x / 2, 0], y: [0, y, -y / 2, 0], scale: [1, 1.15, 0.95, 1] },
          transition: { duration, repeat: Infinity, ease: 'easeInOut' },
        }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink py-28 md:py-40"
    >
      {/* 1. Drifting gold + moss glows */}
      <motion.div
        {...drift(60, -40, 16)}
        className="pointer-events-none absolute left-[5%] top-[8%] h-72 w-72 rounded-full bg-gold/25 blur-3xl md:h-96 md:w-96"
      />
      <motion.div
        {...drift(-50, 40, 19)}
        className="pointer-events-none absolute bottom-[4%] right-[6%] h-72 w-72 rounded-full bg-moss/40 blur-3xl md:h-96 md:w-96"
      />
      <motion.div
        {...drift(40, 50, 22)}
        className="pointer-events-none absolute right-[30%] top-[40%] h-56 w-56 rounded-full bg-gold/15 blur-3xl"
      />

      {/* 2. Faint dot grid with a roaming spotlight */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 25%, transparent 75%)',
          maskImage:
            'radial-gradient(ellipse at center, black 25%, transparent 75%)',
        }}
      />
      <motion.div
        animate={reduce ? undefined : { x: ['-28vw', '28vw', '-28vw'], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-1/2 top-1/2 -ml-[14rem] -mt-[14rem] h-[28rem] w-[28rem] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(184,132,46,0.22) 0%, transparent 65%)',
        }}
      />

      {/* 3. Floating real screens, with parallax on scroll */}
      {manifestoScreens.map((screen) => (
        <FloatingScreen
          key={screen.src}
          screen={screen}
          progress={scrollYProgress}
          reduce={reduce}
        />
      ))}

      {/* Keeps the text area dark so it stays readable over the screens */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(21,19,15,0.85)_25%,transparent_70%)]" />

      <div className="container-max relative z-10 px-6 text-center">
        {/* Text 1 + 2: word-by-word headline, shimmer + underline on the punchline */}
        <motion.h2
          variants={headlineParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="font-display mx-auto max-w-4xl text-3xl font-bold leading-snug tracking-tight text-white md:text-5xl"
        >
          {manifestoWords.map((word, i) => (
            <span key={`${word}-${i}`}>
              <motion.span variants={headlineWord} className="inline-block">
                {word}
              </motion.span>{' '}
            </span>
          ))}
          <motion.span
            variants={headlineWord}
            className="relative inline-block whitespace-nowrap"
          >
            <motion.span
              animate={reduce ? undefined : { backgroundPosition: ['100% 0', '0% 0'] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: 'easeInOut',
              }}
              className="text-gold"
              style={
                reduce
                  ? undefined
                  : {
                      backgroundImage:
                        'linear-gradient(110deg, #B8842E 40%, #F6DC9B 50%, #B8842E 60%)',
                      backgroundSize: '250% 100%',
                      backgroundPosition: '100% 0',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }
              }
            >
              users' hands.
            </motion.span>
            <svg
              viewBox="0 0 200 12"
              preserveAspectRatio="none"
              className="pointer-events-none absolute -bottom-2 left-0 h-3 w-full"
              aria-hidden="true"
            >
              <motion.path
                d="M2 8 C 40 2, 100 12, 198 4"
                fill="none"
                stroke="#B8842E"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 1.3, ease: 'easeOut' }}
              />
            </svg>
          </motion.span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mx-auto mt-8 max-w-2xl text-base text-slate-300 md:text-lg"
        >
          Mockups don't move businesses. Working products do. Everything you
          see here is live, clickable, and in use today.
        </motion.p>

        {/* 4. Pulsing LIVE chips */}
        <div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-3">
          {liveProducts.map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-200 backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ DEVICE FRAME — aspect-locked to the real screenshot, nothing gets cropped ============ */
function DeviceFrame({ src, alt, className }) {
  return (
    <div
      className={`relative aspect-[9/19] overflow-hidden rounded-[1.4rem] border-[5px] border-ink bg-white shadow-xl ${className}`}
    >
      <div className="absolute top-1 left-1/2 -translate-x-1/2 h-2.5 w-14 rounded-full bg-ink z-10" />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover object-top"
      />
    </div>
  )
}

function ShotFrame({ item, phoneClass }) {
  return <DeviceFrame src={item.img} alt={item.title} className={phoneClass} />
}

/* ============ SERVICES — index list, no boxes ============ */
const services = [
  {
    title: 'Web App & Dashboard Design',
    desc: 'Complex SaaS platforms and data-rich dashboards built for clarity and control.',
  },
  {
    title: 'Corporate & Startup Websites',
    desc: 'High-converting, trust-building websites for established brands and growing startups.',
  },
  {
    title: 'Mobile App Design',
    desc: 'Native-feel iOS and Android experiences designed for real-world users.',
  },
  {
    title: 'UI/UX Prototyping',
    desc: 'Wireframes and interactive user flows that validate ideas before a line of code.',
  },
]

function Services() {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <span className="text-sm font-semibold text-gold">What we do</span>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Services built around your goals
          </h2>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          {services.map((s) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="group grid gap-2 border-t border-line py-8 md:grid-cols-12 md:items-baseline md:gap-6"
            >
              <span className="hidden h-px w-8 self-center bg-line md:col-span-1 md:block" />
              <h3 className="font-display text-xl font-bold transition-colors [@media(hover:hover)]:group-hover:text-gold md:col-span-4">
                {s.title}
              </h3>
              <p className="text-base leading-relaxed text-muted md:col-span-7">
                {s.desc}
              </p>
            </motion.div>
          ))}
          <div className="border-t border-line" />
        </div>
      </div>
    </section>
  )
}

/* ============ PORTFOLIO — frames float free, no card boxes ============ */
/* ============ TILT CARD — scroll-linked rotation + mouse-move tilt, real perspective ============ */
function TiltCard({ children, className = '', index = 0, maxTilt = 14 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.92', 'end 0.08'],
  })
  const dir = index % 2 === 0 ? 1 : -1
  const scrollRotateY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [dir * maxTilt, 0, -dir * maxTilt]
  )

  const mouseY = useMotionValue(0)
  const mouseX = useMotionValue(0)
  const springY = useSpring(mouseY, { stiffness: 220, damping: 22 })
  const springX = useSpring(mouseX, { stiffness: 220, damping: 22 })

  const rotateY = useTransform([scrollRotateY, springY], ([s, m]) => s + m)

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    mouseY.set(px * (maxTilt * 0.9))
    mouseX.set(-py * (maxTilt * 0.7))
  }
  function handleMouseLeave() {
    mouseY.set(0)
    mouseX.set(0)
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div style={{ rotateX: springX, rotateY, transformStyle: 'preserve-3d' }}>
        {children}
      </motion.div>
    </div>
  )
}

const featured = [
  {
    tag: 'SaaS Platform',
    title: 'Supreme Gate',
    subtitle: 'Election Intelligence SaaS Platform',
    frame: 'browser',
    label: 'supremegate.com.ng',
    img: '/images/sg-home.jpg',
    pos: 'object-[50%_32%]',
    link: 'https://www.supremegate.com.ng',
  },
  {
    tag: 'Corporate / NGO',
    title: 'Career Builder Schools',
    subtitle: 'Institutional Website & Admissions Platform',
    frame: 'browser',
    label: 'Career Builder Schools',
    img: '/images/cbs-home.jpg',
    pos: 'object-[50%_30%]',
    link: '#',
  },
  {
    tag: 'Web App',
    title: 'HHF CareConnect',
    subtitle: 'Support Web App & Admin Workspace',
    frame: 'phone',
    img: '/images/careconnect-chat.jpg',
    pos: 'object-[50%_28%]',
    link: 'https://chat.hhfoundation.com.ng',
  },
]

const archive = [
  {
    tag: 'AI / SaaS',
    title: 'AttendAI',
    subtitle: 'AI-powered workforce attendance',
    frame: 'browser',
    label: 'AttendAI',
    img: '/images/attendai-login.jpg',
    pos: 'object-[50%_45%]',
  },
  {
    tag: 'EdTech',
    title: 'School Resource Center',
    subtitle: 'School management platform',
    frame: 'browser',
    label: 'School Resource Center',
    img: '/images/src-login.jpg',
    pos: 'object-[50%_35%]',
  },
  {
    tag: 'AI Tools',
    title: 'ReelLoader',
    subtitle: 'AI content engine for creators',
    frame: 'browser',
    label: 'reel-loader.vercel.app',
    img: '/images/reelloader.jpg',
    pos: 'object-top',
  },
  {
    tag: 'AI / Creative',
    title: 'Moremi Ajasoro',
    subtitle: 'AI showrunner, QwenCloud Hackathon 2026',
    frame: 'browser',
    label: 'moremi-showrunner.vercel.app',
    img: '/images/moremi.jpg',
    pos: 'object-top',
  },
  {
    tag: 'Dashboard',
    title: 'HHF Admin Workspace',
    subtitle: 'Secure staff workspace & case management',
    frame: 'browser',
    label: 'admin.hhfoundation.com.ng',
    img: '/images/hhf-dashboard.jpg',
    pos: 'object-center',
  },
  {
    tag: 'Mobile Web App',
    title: 'Supreme Gate Agent App',
    subtitle: 'Field operations app for ward agents',
    frame: 'phone',
    img: '/images/sg-agent.jpg',
    pos: 'object-top',
  },
  {
    tag: 'Web Content',
    title: 'CBS Campus Gallery',
    subtitle: 'Photo & video experience for schools',
    frame: 'browser',
    label: 'Career Builder Schools',
    img: '/images/cbs-gallery.jpg',
    pos: 'object-top',
  },
  {
    tag: 'Dashboard',
    title: 'SRC Overview Dashboard',
    subtitle: 'School analytics at a glance',
    frame: 'browser',
    label: 'School Resource Center',
    img: '/images/src-dashboard.jpg',
    pos: 'object-top',
  },
]

function Portfolio() {
  const [showMore, setShowMore] = useState(false)
  const [selected, setSelected] = useState(null)
  const showcaseRef = useRef(null)
  const showcaseInView = useInView(showcaseRef, { once: true, margin: '400px' })

  return (
    <section id="work" className="section-padding">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="text-sm font-semibold text-gold">Selected work</span>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Selected projects
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted">
            Tap a screen to open that project.
          </p>
        </motion.div>

        {/* Featured 3 — real products, live and scrolling, on your actual desk photo */}
        <div ref={showcaseRef}>
          {showcaseInView ? (
            <PhotoShowcase projects={featured} onSelect={setSelected} />
          ) : (
            <div className="mx-auto aspect-[1536/1024] w-full max-w-4xl rounded-2xl bg-line/40" />
          )}
        </div>

        {/* Second showcase: cycling project card (tile grows and scrolls through each site) */}
        <div className="mt-20 md:mt-28">
          <p className="mb-6 text-center text-sm font-semibold text-gold">
            Also shipped
          </p>
          <ProjectShowcase projects={archive} onSelect={setSelected} />
        </div>

        {/* Selected-project detail overlay */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-6 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl"
              >
                <span className="text-xs font-semibold text-gold">{selected.tag}</span>
                <h3 className="font-display mt-2 text-2xl font-bold">{selected.title}</h3>
                <p className="mt-2 text-sm text-muted">{selected.subtitle}</p>
                <div className="mt-6 flex justify-center gap-3">
                  {selected.link && selected.link !== '#' && (
                    <a
                      href={selected.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-white hover:bg-gold-dark"
                    >
                      View Live <ArrowUpRight size={16} />
                    </a>
                  )}
                  <button
                    onClick={() => setSelected(null)}
                    className="rounded-lg border border-line px-5 py-2.5 text-sm font-semibold text-ink hover:border-gold"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View more toggle */}
        <div className="mt-16 text-center">
          <button
            onClick={() => setShowMore(!showMore)}
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition-all hover:border-gold hover:text-gold"
          >
            {showMore ? 'Show fewer projects' : 'View more projects'}
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Archive — floating free */}
        {showMore && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          >
            {archive.map((p, i) => (
              <div key={p.title} className="group">
                <TiltCard index={i} maxTilt={9} className="relative mx-auto w-32 sm:w-36">
                  <ShotFrame
                    item={p}
                    phoneClass="w-full transition-transform duration-500 group-hover:-translate-y-1.5"
                  />
                </TiltCard>
                <div className="mt-4">
                  <span className="text-[11px] font-semibold text-gold">
                    {p.tag}
                  </span>
                  <h4 className="font-display mt-1 font-bold">{p.title}</h4>
                  <p className="mt-1 text-sm text-muted">{p.subtitle}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

/* ============ ABOUT — family voice, counting stats ============ */
const stats = [
  { value: 9, label: 'live products — election, school & healthcare platforms' },
  { value: 0, label: 'abandoned launches' },
  { value: 1, label: 'family name on every launch' },
]

function About() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-max grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold text-gold">Who we are</span>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Software is a family business here.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Rollyadams WebStudio is the digital design arm of the Rollyadams
            family brand. We partner with startups, NGOs, and growing
            businesses to turn complex ideas into clean, functional digital
            products — from SaaS dashboards to high-trust corporate websites.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Every project we ship is designed and built in-house, tested on
            real devices, and measured by one question: does it solve a real
            problem?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap items-end gap-x-12 gap-y-8 border-t border-line pt-10"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-5xl font-bold text-ink">
                <StatNumber to={s.value} />
              </div>
              <div className="mt-2 max-w-[13rem] text-sm leading-snug text-muted">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ============ CONTACT ============ */
const STUDIO_EMAIL = 'adamson@rollyadamstechworld.com.ng'

// Contact form (Web3Forms) — get your free access key at https://web3forms.com
// using adamson@rollyadamstechworld.com.ng, then paste it below.
const WEB3FORMS_KEY = 'd8fb104e-d2dd-46f6-a323-592c0a7602ab'

function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const mailtoFallback = (data) => {
    const subject = encodeURIComponent(`New project inquiry — ${data.get('name')}`)
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nProject type: ${data.get('type')}\n\n${data.get('message')}`
    )
    window.location.href = `mailto:${STUDIO_EMAIL}?subject=${subject}&body=${body}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)

    // Spam trap: real visitors never fill this hidden field
    if (data.get('botcheck')) return

    // Key not set yet -> keep the old behaviour so the form never breaks
    if (!WEB3FORMS_KEY) {
      mailtoFallback(data)
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New project inquiry — ${data.get('name')}`,
          from_name: 'Rollyadams WebStudio website',
          name: data.get('name'),
          email: data.get('email'),
          replyto: data.get('email'),
          project_type: data.get('type'),
          message: data.get('message'),
        }),
      })
      const json = await res.json()
      if (json.success) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-padding">
      <div className="container-max grid gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold text-gold">Get in touch</span>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Ready to build something that solves a real problem?
          </h2>
          <p className="mt-6 text-lg text-muted">
            Book a free 15-minute discovery call, or send us a message. We
            reply within 24 hours.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <a
              href={BOOKING_LINK}
              onClick={openBooking}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-8 py-4 text-base font-semibold text-white shadow-lg shadow-gold/30 transition-all hover:bg-gold-dark hover:-translate-y-0.5"
            >
              <CalendarClock size={18} /> Book a 15-min Discovery Call
            </a>
            <a
              href={`mailto:${STUDIO_EMAIL}`}
              className="inline-flex items-center justify-center gap-2 text-base font-semibold text-muted hover:text-ink transition-colors"
            >
              <Mail size={18} /> {STUDIO_EMAIL}
            </a>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl border border-line bg-white p-8 shadow-sm"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="Your name"
                className="w-full rounded-lg border border-line bg-paper px-4 py-3 text-sm outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                className="w-full rounded-lg border border-line bg-paper px-4 py-3 text-sm outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-1.5 block text-sm font-semibold" htmlFor="type">
              Project type
            </label>
            <select
              id="type"
              name="type"
              className="w-full rounded-lg border border-line bg-paper px-4 py-3 text-sm outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/20"
            >
              <option>Web App & Dashboard</option>
              <option>Corporate / NGO Website</option>
              <option>Mobile App (iOS / Android)</option>
              <option>UI/UX Prototyping</option>
              <option>Other</option>
            </select>
          </div>

          <div className="mt-5">
            <label className="mb-1.5 block text-sm font-semibold" htmlFor="message">
              Project details
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              placeholder="Tell us briefly what you want to build..."
              className="w-full rounded-lg border border-line bg-paper px-4 py-3 text-sm outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/20"
            />
          </div>

          {/* Hidden spam trap */}
          <input
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            style={{ display: 'none' }}
          />

          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-8 py-4 text-base font-semibold text-white transition-all hover:bg-black hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
          >
            <Send size={18} /> {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p role="status" className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
              Thank you! Your message has been sent. We'll reply within 24 hours.
            </p>
          )}
          {status === 'error' && (
            <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
              Something went wrong. Please email us directly at{' '}
              <a href={`mailto:${STUDIO_EMAIL}`} className="underline">{STUDIO_EMAIL}</a>.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  )
}

/* ============ FOOTER ============ */
const quickLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Work', href: '#work' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-max section-padding grid gap-10 md:grid-cols-3">
        <div>
          <a href="#" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold font-display text-white font-bold">
              R
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              Rollyadams <span className="text-gold">WebStudio</span>
            </span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            We build digital products that solve real problems. SaaS platforms,
            web apps, and high-converting corporate websites.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-400">
            Explore
          </h4>
          <ul className="mt-4 space-y-3">
            {quickLinks.map((l) => (
              <li key={l.name}>
                <a
                  href={l.href}
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-400">
            Get in touch
          </h4>
          <a
            href={`mailto:${STUDIO_EMAIL}`}
            className="mt-4 inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white"
          >
            <Mail size={16} /> {STUDIO_EMAIL}
          </a>
          <p className="mt-6 text-xs text-slate-500">
            Part of the Rollyadams Techworld family brand.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-max flex flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-slate-500 sm:flex-row">
          <span>
            © {new Date().getFullYear()} Rollyadams WebStudio. All rights
            reserved.
          </span>
          <span>Lagos, Nigeria</span>
        </div>
      </div>
    </footer>
  )
}

/* ============ APP ============ */
export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Manifesto />
        <Services />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}