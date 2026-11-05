import { useState } from 'react'
import { HiMail, HiPhone, HiLocationMarker, HiPaperAirplane } from 'react-icons/hi'
import Section, { Reveal } from './Section'
import { profile } from '../data/portfolio'

const info = [
  { icon: HiMail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: HiPhone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
  { icon: HiLocationMarker, label: 'Location', value: profile.location },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // Opens the visitor's email app with the message pre-filled (no backend needed).
  const submit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const input =
    'w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-accent'

  return (
    <Section id="contact" eyebrow="Contact" title="Let's work together">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        <Reveal className="space-y-4">
          <p className="leading-relaxed text-slate-400">
            I&apos;m open to internships and collaboration on interesting projects. If you have an opportunity
            or just want to say hi, my inbox is always open.
          </p>
          {info.map(({ icon: Icon, label, value, href }) => {
            const Tag = href ? 'a' : 'div'
            return (
              <Tag key={label} href={href} className="card flex items-center gap-4 p-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-xl text-accent">
                  <Icon />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-slate-500">{label}</span>
                  <span className="block truncate text-sm font-medium text-white">{value}</span>
                </span>
              </Tag>
            )
          })}
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={submit} className="card space-y-4 p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="name" required placeholder="Your name" value={form.name} onChange={update} className={input} />
              <input name="email" type="email" required placeholder="Your email" value={form.email} onChange={update} className={input} />
            </div>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Your message"
              value={form.message}
              onChange={update}
              className={`${input} resize-none`}
            />
            <button type="submit" className="btn-primary w-full justify-center">
              Send message <HiPaperAirplane className="rotate-90" />
            </button>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
