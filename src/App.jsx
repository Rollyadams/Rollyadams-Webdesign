import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Menu,
  X,
  ArrowRight,
  CalendarClock,
  LayoutDashboard,
  Globe,
  Smartphone,
  PenTool,
  ArrowUpRight,
  ChevronDown,
  Mail,
  Send,
} from 'lucide-react'

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-slate-200">
      <nav className="container-max flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand font-display text-white font-bold">
            R
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Rollyadams <span className="text-brand">WebStudio</span>
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
            className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/30 transition-all hover:bg-brand-dark hover:-translate-y-0.5"
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
        <div className="md:hidden border-t border-slate-200 bg-surface px-6 py-4 flex flex-col gap-4">
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
            className="rounded-lg bg-brand px-5 py-3 text-center text-sm font-semibold text-white"
          >
            Book a Call
          </a>
        </div>
      )}
    </header>
  )
}

/* ============ HERO ============ */
const heroContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const heroItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const marqueeShots = [
  { src: '/images/sg-login.jpg', alt: '' },
  { src: '/images/careconnect-chat.jpg', alt: '' },
  { src: '/images/cbs-home.jpg', alt: '' },
  { src: '/images/attendai-login.jpg', alt: '' },
]

function Hero() {
  const loop = [...marqueeShots, ...marqueeShots]

  return (
    <section className="relative overflow-hidden pt-36 pb-48 section-padding">
      {/* Tilted exhibit shelf — your shipped work, composed on purpose */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[58%] rotate-[-2deg] scale-105"
      >
        <div className="marquee">
          <div className="marquee-track">
            {loop.map((shot, i) => (
              <img
                key={i}
                src={shot.src}
                alt={shot.alt}
                loading="lazy"
                className="mr-6 h-56 w-80 md:h-72 md:w-[26rem] rounded-2xl object-cover shadow-xl border border-slate-200"
              />
            ))}
          </div>
        </div>
        <span className="absolute -top-5 left-[6%] rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-muted shadow-md">
          Live from the workshop →
        </span>
      </div>

      {/* Readability pool for the headline */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_62%_52%_at_50%_36%,rgba(248,250,252,0.97),rgba(248,250,252,0.85)_45%,rgba(248,250,252,0)_80%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-surface to-transparent" />

      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="show"
        className="container-max relative z-10 flex flex-col items-center text-center"
      >
        <motion.span
          variants={heroItem}
          className="mb-6 rounded-full border border-brand/20 bg-white/80 px-4 py-1.5 text-xs font-semibold tracking-widest text-brand uppercase backdrop-blur"
        >
          9+ Live Products Shipped
        </motion.span>

        <motion.h1
          variants={heroItem}
          className="font-display max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl"
        >
          We design it. We build it.{' '}
          <span className="text-brand">It ships.</span>
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="mt-6 max-w-2xl text-lg text-muted md:text-xl"
        >
          Election intelligence platforms. School management systems. AI
          content tools. Support portals. Nine-plus live products — designed
          and built in-house from Lagos.
        </motion.p>

        <motion.div
          variants={heroItem}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#work"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-dark hover:-translate-y-0.5"
          >
            See what we've shipped <ArrowRight size={18} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-ink transition-all hover:border-ink"
          >
            <CalendarClock size={18} /> Talk to a designer
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ============ MANIFESTO ============ */
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
          <span className="text-blue-400">users' hands.</span>
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

/* ============ DEVICE FRAMES ============ */
function PhoneFrame({ src, alt, pos, className }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.6rem] border-[6px] border-slate-900 bg-white shadow-2xl ${className}`}
    >
      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 h-3 w-16 rounded-full bg-slate-900 z-10" />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover ${pos}`}
      />
    </div>
  )
}

function BrowserFrame({ label, src, alt, pos, className }) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-2 flex-1 truncate rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[10px] text-slate-400">
          {label}
        </span>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover ${pos}`}
        />
      </div>
    </div>
  )
}

function ShotFrame({ item, phoneClass, browserClass }) {
  if (item.frame === 'phone') {
    return (
      <PhoneFrame
        src={item.img}
        alt={item.title}
        pos={item.pos}
        className={phoneClass}
      />
    )
  }
  return (
    <BrowserFrame
      label={item.label}
      src={item.img}
      alt={item.title}
      pos={item.pos}
      className={browserClass}
    />
  )
}

/* ============ SERVICES ============ */
const services = [
  {
    icon: LayoutDashboard,
    title: 'Web App & Dashboard Design',
    desc: 'Complex SaaS platforms and data-rich dashboards built for clarity and control.',
  },
  {
    icon: Globe,
    title: 'Corporate & NGO Websites',
    desc: 'High-converting, trust-building websites for established brands and organisations.',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Design',
    desc: 'Native-feel iOS and Android experiences designed for real-world users.',
  },
  {
    icon: PenTool,
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
          className="mb-14 text-center"
        >
          <span className="text-xs font-semibold tracking-widest text-brand uppercase">
            What We Do
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Services built around your goals
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl border border-slate-200 bg-surface p-8 transition-all hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10 hover:-translate-y-1"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <s.icon size={24} />
              </div>
              <h3 className="mb-3 text-lg font-bold">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ PORTFOLIO ============ */
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
    subtitle: 'AI showrunner · QwenCloud Hackathon 2026',
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
          <span className="text-xs font-semibold tracking-widest text-brand uppercase">
            Our Work
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Selected projects
          </h2>
        </motion.div>

        {/* Featured 3 — devices floating alone on white */}
        <div className="grid gap-8 md:grid-cols-3">
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
              className="group rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative grid h-72 place-items-center px-6">
                <div className="absolute h-36 w-36 rounded-full bg-brand/10 blur-3xl" />
                <ShotFrame
                  item={p}
                  phoneClass="relative h-60 aspect-[9/16] transition-transform duration-500 group-hover:scale-105"
                  browserClass="relative h-52 w-full transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute top-4 left-4 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                  {p.tag}
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-display text-lg font-bold group-hover:text-brand transition-colors">
                  {p.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{p.subtitle}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                  View Live <ArrowUpRight size={16} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* View more toggle */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowMore(!showMore)}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-ink transition-all hover:border-brand hover:text-brand"
          >
            {showMore ? 'Show fewer projects' : 'View more projects'}
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Archive grid — appears on demand */}
        {showMore && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {archive.map((p) => (
              <div
                key={p.title}
                className="group rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative grid h-52 place-items-center px-4">
                  <ShotFrame
                    item={p}
                    phoneClass="h-40 aspect-[9/16] transition-transform duration-500 group-hover:scale-105"
                    browserClass="h-36 w-full transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <span className="text-[11px] font-semibold tracking-widest text-brand uppercase">
                    {p.tag}
                  </span>
                  <h4 className="font-display mt-1 font-bold">{p.title}</h4>
                  <p className="mt-1 text-xs text-muted">{p.subtitle}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

/* ============ ABOUT ============ */
const stats = [
  { value: '9+', label: 'Live products shipped' },
  { value: '24h', label: 'Average response time' },
  { value: '100%', label: 'Design & build in-house' },
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
          <span className="text-xs font-semibold tracking-widest text-brand uppercase">
            Who We Are
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            A Lagos-based studio held to a global standard.
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
          className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-slate-200 bg-surface p-6 text-center sm:text-left"
            >
              <div className="font-display text-4xl font-bold text-brand">
                {s.value}
              </div>
              <div className="mt-1 text-sm font-medium text-muted">{s.label}</div>
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
          <span className="text-xs font-semibold tracking-widest text-brand uppercase">
            Contact
          </span>
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
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-dark hover:-translate-y-0.5"
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
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
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
                className="w-full rounded-lg border border-slate-300 bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
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
                className="w-full rounded-lg border border-slate-300 bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
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
              className="w-full rounded-lg border border-slate-300 bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
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
              className="w-full rounded-lg border border-slate-300 bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
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
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand font-display text-white font-bold">
              R
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              Rollyadams <span className="text-brand">WebStudio</span>
            </span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            We build digital products that solve real problems. SaaS platforms,
            web apps, and high-converting corporate websites.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-400">
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
          <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-400">
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
          <span>Lagos, Nigeria · Working worldwide</span>
        </div>
      </div>
    </footer>
  )
}

/* ============ APP ============ */
export default function App() {
  return (
    <div className="min-h-screen bg-surface text-ink">
      <Navbar />
      <main>
        <Hero />
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