import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

// Everything below comes from the live sites themselves.
// Optional fields you can add per project once you have them:
//   result: 'One real outcome, e.g. "Used by 3 schools this term"'
//   quote: { text: '...', by: 'Name, role' }   <- only real client words
const studies = [
  {
    title: 'Supreme Gate',
    kind: 'Election operations platform',
    img: '/images/sg-home.jpg',
    need: "Political parties had no live picture of what was happening across polling units on election day.",
    built:
      'A real-time platform with GPS agent tracking, live result verification and incident reporting, plus a mobile web app for field agents.',
    facts: ['176,846 polling units', '774 LGAs', 'Agent mobile app'],
    links: [{ label: 'Visit live site', href: 'https://www.supremegate.com.ng' }],
  },
  {
    title: 'School Resource Center',
    kind: 'School management & report portal',
    img: '/images/src-dashboard.jpg',
    need: 'Schools needed one reliable place to manage attendance and publish academic reports.',
    built:
      'An installable web app for academic report management and AI-assisted attendance, built for West African schools.',
    facts: ['Installable web app', 'Report management', 'Attendance'],
    note: 'Career Builder Schools links to it from their own website as their School Report Portal.',
    links: [
      { label: 'Visit live portal', href: 'https://schools.rollyadamstechworld.com.ng' },
    ],
  },
  {
    title: 'Career Builder Schools',
    kind: 'School website & admissions',
    img: '/images/cbs-home.jpg',
    need: 'A government-approved school in Ota, Ogun State (founded 2006) needed a website that could explain the school and take admissions online.',
    built:
      'A full school website: programmes from nursery to senior secondary, a step-by-step admissions process with an online form, photo gallery, videos, news and a contact form.',
    facts: ['Est. 2006', 'Nursery to SSS', 'Online admissions'],
    links: [{ label: 'Visit live site', href: 'https://www.careerbuilderschools.com' }],
  },
  {
    title: 'HHF CareConnect',
    kind: 'Support app & admin workspace',
    img: '/images/hhf-dashboard.jpg',
    need: 'A foundation needed a secure way for staff to handle support requests and manage cases.',
    built:
      'A support web app plus a login-protected admin workspace for staff to manage cases.',
    facts: ['Staff login', 'Case management', 'Support chat'],
    links: [
      { label: 'Open admin login', href: 'https://admin.hhfoundation.com.ng/login' },
      { label: 'Open support app', href: 'https://chat.hhfoundation.com.ng' },
    ],
  },
]

export default function CaseStudies() {
  return (
    <section id="case-studies" className="section-padding bg-white">
      <div className="container-max">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-gold">Proof, not mockups</span>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Four products you can open right now
          </h2>
          <p className="mt-4 text-lg text-muted">
            Every project below is live. Click through and see for yourself.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {studies.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
              className="flex flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-sm"
            >
              <div className="relative h-56 overflow-hidden bg-ink md:h-64">
                <img
                  src={s.img}
                  alt={`${s.title} screenshot`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Live
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-semibold text-gold">{s.kind}</span>
                <h3 className="font-display mt-1 text-2xl font-bold">{s.title}</h3>

                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="font-semibold text-ink">The need</dt>
                    <dd className="mt-0.5 text-muted">{s.need}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">What we built</dt>
                    <dd className="mt-0.5 text-muted">{s.built}</dd>
                  </div>
                  {s.result && (
                    <div>
                      <dt className="font-semibold text-ink">Result</dt>
                      <dd className="mt-0.5 text-muted">{s.result}</dd>
                    </div>
                  )}
                </dl>

                {s.quote && (
                  <blockquote className="mt-4 border-l-2 border-gold pl-4 text-sm italic text-muted">
                    “{s.quote.text}”
                    <footer className="mt-1 text-xs not-italic font-semibold text-ink">
                      {s.quote.by}
                    </footer>
                  </blockquote>
                )}

                {s.note && (
                  <p className="mt-4 rounded-lg bg-white px-3 py-2 text-xs text-muted">
                    {s.note}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {s.facts.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-line bg-white px-3 py-1 text-xs text-muted"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3 pt-2">
                  {s.links.map((l, li) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
                        li === 0
                          ? 'bg-gold text-white hover:bg-gold-dark'
                          : 'border border-line bg-white text-ink hover:border-gold'
                      }`}
                    >
                      {l.label} <ArrowUpRight size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}