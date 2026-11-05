import { HiBriefcase, HiExternalLink } from 'react-icons/hi'
import Section, { Reveal } from './Section'
import { experience } from '../data/portfolio'

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked">
      <div className="relative space-y-8 before:absolute before:left-5 before:top-2 before:h-full before:w-px before:bg-line sm:before:left-6">
        {experience.map((job, i) => (
          <Reveal key={job.role} delay={i * 0.1} className="relative pl-14 sm:pl-16">
            <span className="absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full border border-accent/50 bg-surface text-accent2 sm:h-12 sm:w-12">
              <HiBriefcase className="text-lg" />
            </span>
            <div className="card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{job.role}</h3>
                  <p className="text-sm font-medium text-accent2">{job.company}</p>
                </div>
                <span className="chip">{job.period}</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-400">
                {job.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
                {job.certificate && (
                  <a
                    href={job.certificate}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-white"
                  >
                    View certificate <HiExternalLink />
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
