import { motion } from 'framer-motion'
import { CalendarClock, Mail, Send } from 'lucide-react'

const BOOKING_LINK = 'https://calendly.com/YOUR-LINK' // TODO: replace with your real Calendly link
const STUDIO_EMAIL = 'hello@rollyadamstechworld.com.ng' // TODO: create this email on your domain later

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const subject = encodeURIComponent(`New project inquiry — ${data.get('name')}`)
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nProject type: ${data.get('type')}\n\n${data.get('message')}`
    )
    window.location.href = `mailto:${STUDIO_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="section-padding">
      <div className="container-max grid gap-12 lg:grid-cols-2">
        {/* Left: pitch + booking */}
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

        {/* Right: form */}
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
              <label className="mb-1.5 block text-sm font-semibold" htmlFor="name">Name</label>
              <input id="name" name="name" required placeholder="Your name"
                className="w-full rounded-lg border border-slate-300 bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required placeholder="you@company.com"
                className="w-full rounded-lg border border-slate-300 bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20" />
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-1.5 block text-sm font-semibold" htmlFor="type">Project type</label>
            <select id="type" name="type"
              className="w-full rounded-lg border border-slate-300 bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20">
              <option>Web App & Dashboard</option>
              <option>Corporate / NGO Website</option>
              <option>Mobile App (iOS / Android)</option>
              <option>UI/UX Prototyping</option>
              <option>Other</option>
            </select>
          </div>

          <div className="mt-5">
            <label className="mb-1.5 block text-sm font-semibold" htmlFor="message">Project details</label>
            <textarea id="message" name="message" rows="5" required placeholder="Tell us briefly what you want to build..."
              className="w-full rounded-lg border border-slate-300 bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20" />
          </div>

          <button type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-8 py-4 text-base font-semibold text-white transition-all hover:bg-black hover:-translate-y-0.5">
            <Send size={18} /> Send Message
          </button>
        </motion.form>
      </div>
    </section>
  )
}