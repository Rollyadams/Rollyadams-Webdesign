import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion'
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
            href="#contact"
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
            href="#contact"
            onClick={() => setOpen(false)}
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
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        </AnimatePresence>
        {/* Scrim for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/55 to-ink/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
      </div>

      <div className="container-max relative z-10 flex flex-col items-center px-6 py-28 text-center md:px-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur"
        >
          Product design & engineering, built and shipped in-house
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl"
        >
          We design it. We build it.{' '}
          <span className="text-gold">It ships.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 max-w-2xl text-lg text-white/80 md:text-xl"
        >
          Election intelligence platforms. School management systems. AI
          content tools. Support portals. Nine-plus live products — designed
          and built in-house from Lagos.
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
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
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
function TrustStrip() {
  const names = [
    'Supreme Gate',
    'Career Builder Schools',
    'Hosanna Help Foundation',
    'School Resource Center',
    'AttendAI',
  ]
  return (
    <div className="border-y border-line bg-white py-6">
      <div className="container-max flex flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6">
        {names.map((n) => (
          <span key={n} className="font-display text-base font-semibold text-muted">
            {n}
          </span>
        ))}
      </div>
    </div>
  )
}

function Manifesto() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="container-max px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display mx-auto max-w-4xl text-3xl font-bold leading-snug tracking-tight text-white md:text-5xl"
        >
          From the idea in your head to the product in your{' '}
          <span className="text-gold">users' hands.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-base text-slate-400 md:text-lg"
        >
          Mockups don't move businesses. Working products do. Everything you
          see here is live, clickable, and in use today.
        </motion.p>
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
    title: 'Corporate & NGO Websites',
    desc: 'High-converting, trust-building websites for established brands and organisations.',
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
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group grid gap-2 border-t border-line py-8 md:grid-cols-12 md:items-baseline md:gap-6"
            >
              <span className="hidden h-px w-8 self-center bg-line md:col-span-1 md:block" />
              <h3 className="font-display text-xl font-bold transition-colors group-hover:text-gold md:col-span-4">
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
        </motion.div>

        {/* Featured 3 — floating free */}
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {featured.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group block"
            >
              <div className="relative mx-auto grid w-44 place-items-center sm:w-52">
                <div className="absolute h-36 w-36 rounded-full bg-gold/10 blur-3xl" />
                <ShotFrame
                  item={p}
                  phoneClass="relative w-full transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02]"
                />
                <span className="absolute -top-4 left-0 rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
                  {p.tag}
                </span>
              </div>

              <div className="mt-6">
                <h3 className="font-display text-lg font-bold transition-colors group-hover:text-gold">
                  {p.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{p.subtitle}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gold">
                  View Live <ArrowUpRight size={16} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

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
            {archive.map((p) => (
              <div key={p.title} className="group">
                <div className="relative mx-auto w-32 sm:w-36">
                  <ShotFrame
                    item={p}
                    phoneClass="w-full transition-transform duration-500 group-hover:-translate-y-1.5"
                  />
                </div>
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
const BOOKING_LINK = 'https://calendly.com/YOUR-LINK'
const STUDIO_EMAIL = 'hello@rollyadamstechworld.com.ng'

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const subject = encodeURIComponent(
      `New project inquiry — ${data.get('name')}`
    )
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nProject type: ${data.get('type')}\n\n${data.get('message')}`
    )
    window.location.href = `mailto:${STUDIO_EMAIL}?subject=${subject}&body=${body}`
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
              target="_blank"
              rel="noopener noreferrer"
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

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-8 py-4 text-base font-semibold text-white transition-all hover:bg-black hover:-translate-y-0.5"
          >
            <Send size={18} /> Send Message
          </button>
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