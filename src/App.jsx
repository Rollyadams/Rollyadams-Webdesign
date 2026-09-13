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
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand text-white font-extrabold">
            R
          </span>
          <span className="text-lg font-extrabold tracking-tight">
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

function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 section-padding">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />

      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="show"
        className="container-max relative flex flex-col items-center text-center"
      >
        <motion.span
          variants={heroItem}
          className="mb-6 rounded-full border border-brand/20 bg-brand/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-brand uppercase"
        >
          Digital Product Studio
        </motion.span>

        <motion.h1
          variants={heroItem}
          className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl"
        >
          We build digital products that solve{' '}
          <span className="text-brand">real problems.</span>
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="mt-6 max-w-2xl text-lg text-muted md:text-xl"
        >
          We are a digital design studio specializing in SaaS platforms, web
          apps, and high-converting corporate websites.
        </motion.p>

        <motion.div
          variants={heroItem}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#work"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-dark hover:-translate-y-0.5"
          >
            View Our Work <ArrowRight size={18} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-ink transition-all hover:border-ink"
          >
            <CalendarClock size={18} /> Book a 15-min Call
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ============ WORK MARQUEE (right-to-left) ============ */
const marqueeShots = [
  { src: '/images/sg-login.jpg', alt: 'Supreme Gate login screen' },
  { src: '/images/careconnect-chat.jpg', alt: 'HHF CareConnect chat app' },
  { src: '/images/cbs-home.jpg', alt: 'Career Builder Schools website' },
  { src: '/images/attendai-login.jpg', alt: 'AttendAI login screen' },
]

function WorkMarquee() {
  const loop = [...marqueeShots, ...marqueeShots]

  return (
    <section
      className="marquee relative overflow-hidden py-10 bg-white border-y border-slate-200"
      aria-label="Scrolling work samples"
    >
      <div className="marquee-track">
        {loop.map((shot, i) => (
          <img
            key={i}
            src={shot.src}
            alt={shot.alt}
            loading="lazy"
            className="mr-6 h-44 w-72 md:h-64 md:w-[26rem] rounded-2xl object-cover shadow-lg border border-slate-200"
          />
        ))}
      </div>

      {/* soft edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
    </section>
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
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
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
    img: '/images/sg-home.jpg',
    pos: 'object-center',
    link: 'https://www.supremegate.com.ng',
  },
  {
    tag: 'Corporate / NGO',
    title: 'Career Builder Schools',
    subtitle: 'Institutional Website & Admissions Platform',
    img: '/images/cbs-home.jpg',
    pos: 'object-center',
    link: '#',
  },
  {
    tag: 'Web App',
    title: 'HHF CareConnect',
    subtitle: 'Support Web App & Admin Workspace',
    img: '/images/careconnect-chat.jpg',
    pos: 'object-top',
    link: 'https://chat.hhfoundation.com.ng',
  },
]

const moreWork = [
  {
    tag: 'AI / SaaS',
    title: 'AttendAI',
    subtitle: 'AI-powered workforce attendance',
    img: '/images/attendai-login.jpg',
  },
  {
    tag: 'EdTech',
    title: 'School Resource Center',
    subtitle: 'School management platform',
    img: '/images/src-login.jpg',
  },
  {
    tag: 'AI Tools',
    title: 'ReelLoader',
    subtitle: 'AI content engine for creators',
    img: '/images/reelloader.jpg',
  },
  {
    tag: 'AI / Creative',
    title: 'Moremi Ajasoro',
    subtitle: 'AI showrunner · QwenCloud Hackathon 2026',
    img: '/images/moremi.jpg',
  },
  {
    tag: 'Dashboard',
    title: 'HHF Admin Workspace',
    subtitle: 'Case & appointment management dashboard',
    img: '/images/hhf-dashboard.jpg',
  },
  {
    tag: 'Mobile Web App',
    title: 'Supreme Gate Agent App',
    subtitle: 'Field operations app for ward agents',
    img: '/images/sg-agent.jpg',
  },
  {
    tag: 'Web Content',
    title: 'CBS Campus Gallery',
    subtitle: 'Photo & video experience for schools',
    img: '/images/cbs-gallery.jpg',
  },
  {
    tag: 'Dashboard',
    title: 'SRC Overview Dashboard',
    subtitle: 'School analytics at a glance',
    img: '/images/src-dashboard.jpg',
  },
]

function Portfolio() {
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
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            Selected projects
          </h2>
        </motion.div>

        {/* Featured 3 */}
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
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className={`h-full w-full object-cover ${p.pos} transition-transform duration-500 group-hover:scale-105`}
                />
                <span className="absolute top-4 left-4 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  {p.tag}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold group-hover:text-brand transition-colors">
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

        {/* More work grid (8) */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {moreWork.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="text-[11px] font-semibold tracking-widest text-brand uppercase">
                  {p.tag}
                </span>
                <h4 className="mt-1 font-bold">{p.title}</h4>
                <p className="mt-1 text-xs text-muted">{p.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ ABOUT ============ */
const stats = [
  { value: '4+', label: 'Live platforms shipped' },
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
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
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
              <div className="text-4xl font-extrabold text-brand">{s.value}</div>
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
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
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
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand text-white font-extrabold">
              R
            </span>
            <span className="text-lg font-extrabold tracking-tight">
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
        <WorkMarquee />
        <Services />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}