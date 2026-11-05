import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { FaTrophy, FaUsers, FaCode, FaGlobeAsia, FaMedal } from 'react-icons/fa'
import { HiExternalLink, HiX, HiCalendar } from 'react-icons/hi'
import Section, { Reveal } from './Section'
import { hackathons } from '../data/portfolio'

const typeStyle = {
  Internal: { chip: 'border-accent/40 bg-accent/10 text-violet-300', dot: 'from-accent to-fuchsia-500' },
  National: { chip: 'border-accent2/40 bg-accent2/10 text-cyan-300', dot: 'from-accent2 to-sky-500' },
  Organizer: { chip: 'border-amber-400/40 bg-amber-400/10 text-amber-300', dot: 'from-amber-400 to-orange-500' },
}

const iconFor = (h) => (h.podium ? FaTrophy : h.type === 'Organizer' ? FaUsers : h.type === 'National' ? FaGlobeAsia : FaCode)

function Stat({ value, label }) {
  return (
    <div className="card px-5 py-4 text-center">
      <div className="font-display text-2xl font-bold text-white">{value}</div>
      <div className="mt-1 text-xs text-slate-400">{label}</div>
    </div>
  )
}

function HackCard({ h, index, onPreview }) {
  const style = typeStyle[h.type] || typeStyle.Internal
  return (
    <div className={`card overflow-hidden ${h.podium ? 'border-amber-300/40 shadow-[0_0_40px_-12px_rgba(251,191,36,0.5)]' : ''}`}>
      {h.image && (
        <button
          onClick={() => onPreview(h)}
          className="group relative block aspect-[16/8] w-full overflow-hidden border-b border-line bg-white/5"
          aria-label={`Preview ${h.name} certificate`}
        >
          <img
            src={h.image}
            alt={`${h.name} certificate`}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 grid place-items-center bg-night/60 text-sm font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
            View certificate
          </span>
        </button>
      )}

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs font-semibold text-slate-500">TRACK {String(index + 1).padStart(2, '0')}</span>
          <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${style.chip}`}>{h.type}</span>
          {h.date && (
            <span className="ml-auto inline-flex items-center gap-1 text-xs text-slate-400">
              <HiCalendar /> {h.date}
            </span>
          )}
        </div>

        <h3 className="mt-3 text-xl font-semibold">{h.name}</h3>
        <p className="text-sm text-slate-400">{h.edition}</p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-sm font-semibold ${
              h.podium
                ? 'bg-gradient-to-r from-amber-300 to-yellow-500 text-night'
                : h.type === 'Organizer'
                  ? 'bg-amber-400/15 text-amber-300'
                  : 'bg-white/[0.06] text-slate-200'
            }`}
          >
            {h.podium ? <FaMedal /> : h.type === 'Organizer' ? <FaUsers /> : <FaCode />}
            {h.result}
          </span>
          {h.team && <span className="chip">{h.team}</span>}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-400">{h.description}</p>
        <p className="mt-3 text-xs text-slate-500">{h.organizer}</p>

        {h.link && (
          <a
            href={h.link}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-white"
          >
            Certificate <HiExternalLink />
          </a>
        )}
      </div>
    </div>
  )
}

export default function Hackathons() {
  const trackRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 75%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  const stats = [
    { value: hackathons.filter((h) => h.type !== 'Organizer').length, label: 'Hackathons competed' },
    { value: hackathons.filter((h) => h.podium).length, label: 'Podium finish' },
    { value: hackathons.filter((h) => h.type === 'National').length, label: 'National-level' },
    { value: hackathons.filter((h) => h.type === 'Organizer').length, label: 'Organizing role' },
  ]

  return (
    <Section id="hackathons" eyebrow="Hackathon Journey" title="From participant to organizer">
      <Reveal className="mb-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </Reveal>

      <div ref={trackRef} className="relative">
        {/* track line + scroll-driven fill */}
        <div className="absolute bottom-0 left-5 top-0 w-0.5 rounded-full bg-line md:left-1/2 md:-translate-x-1/2" />
        <motion.div
          style={{ scaleY: fill }}
          className="absolute bottom-0 left-5 top-0 w-0.5 origin-top rounded-full bg-gradient-to-b from-accent via-fuchsia-500 to-amber-400 md:left-1/2 md:-translate-x-1/2"
        />

        <ol className="space-y-12 md:space-y-16">
          {hackathons.map((h, i) => {
            const Icon = iconFor(h)
            const left = i % 2 === 0
            const style = typeStyle[h.type] || typeStyle.Internal
            return (
              <li key={h.name} className="relative md:grid md:grid-cols-2 md:gap-16">
                {/* milestone node */}
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className={`absolute left-5 top-6 z-10 grid h-11 w-11 -translate-x-1/2 place-items-center rounded-full bg-gradient-to-br ${style.dot} text-white shadow-glow ring-4 ring-night md:left-1/2`}
                >
                  <Icon />
                  {h.podium && <span className="absolute inset-0 animate-ping rounded-full bg-amber-400/30" />}
                </motion.span>

                <motion.div
                  initial={{ opacity: 0, x: left ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`pl-14 md:pl-0 ${left ? 'md:col-start-1 md:pr-2' : 'md:col-start-2 md:pl-2'}`}
                >
                  <HackCard h={h} index={i} onPreview={setPreview} />
                </motion.div>
              </li>
            )
          })}
        </ol>

        {/* end of track */}
        <div className="relative mt-12 flex justify-start pl-14 md:justify-center md:pl-0">
          <span className="chip !px-4 !py-2 !text-sm">Next stop: more hackathons 🚀</span>
        </div>
      </div>

      <AnimatePresence>
        {preview && (
          <motion.div
            className="fixed inset-0 z-[60] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(null)}
          >
            <motion.figure
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-h-[90vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={preview.image} alt={`${preview.name} certificate`} className="max-h-[80vh] rounded-xl object-contain" />
              <figcaption className="mt-3 text-center text-sm text-slate-300">
                {preview.name} · {preview.result}
              </figcaption>
              <button
                onClick={() => setPreview(null)}
                className="absolute -right-2 -top-2 grid h-9 w-9 place-items-center rounded-full bg-white text-black"
                aria-label="Close preview"
              >
                <HiX />
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
