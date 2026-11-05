import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiExternalLink, HiX, HiBadgeCheck } from 'react-icons/hi'
import { FaTrophy } from 'react-icons/fa'
import Section, { Reveal } from './Section'
import { achievements } from '../data/portfolio'

export default function Achievements() {
  const [preview, setPreview] = useState(null)

  return (
    <Section id="achievements" eyebrow="Achievements & Certifications" title="Recognition along the way">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={(i % 3) * 0.08} className="card group flex flex-col overflow-hidden">
            {a.image ? (
              <button
                onClick={() => setPreview(a)}
                className="relative aspect-[16/10] overflow-hidden border-b border-line bg-white/5"
                aria-label={`Preview ${a.title}`}
              >
                <img
                  src={a.image}
                  alt={a.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 grid place-items-center bg-night/60 text-sm font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                  Click to preview
                </span>
              </button>
            ) : (
              <div className="grid aspect-[16/10] place-items-center border-b border-line bg-gradient-to-br from-accent/15 to-accent2/10">
                {a.featured ? (
                  <FaTrophy className="text-4xl text-amber-300" />
                ) : (
                  <HiBadgeCheck className="text-5xl text-accent2" />
                )}
              </div>
            )}
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-start gap-2">
                {a.featured && <FaTrophy className="mt-1 shrink-0 text-amber-300" />}
                <h3 className="text-base font-semibold leading-snug">{a.title}</h3>
              </div>
              <p className="mt-2 text-sm text-slate-400">{a.issuer}</p>
              {a.date && <p className="mt-1 text-xs text-slate-500">{a.date}</p>}
              <a
                href={a.link}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-accent hover:text-white"
              >
                View certificate <HiExternalLink />
              </a>
            </div>
          </Reveal>
        ))}
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
              <img src={preview.image} alt={preview.title} className="max-h-[80vh] rounded-xl object-contain" />
              <figcaption className="mt-3 text-center text-sm text-slate-300">{preview.title}</figcaption>
              <button
                onClick={() => setPreview(null)}
                className="absolute -right-2 -top-2 grid h-9 w-9 place-items-center rounded-full bg-white text-base text-black"
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
