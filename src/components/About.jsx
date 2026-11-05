import { HiAcademicCap } from 'react-icons/hi'
import Section, { Reveal } from './Section'
import { profile, stats, education } from '../data/portfolio'

export default function About() {
  return (
    <Section id="about" eyebrow="About me" title="Developer, learner, problem solver">
      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal className="space-y-4 leading-relaxed text-slate-400">
          {profile.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="card p-4 text-center">
                <div className="font-display text-2xl font-bold text-white">{s.value}</div>
                <div className="mt-1 text-xs text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold">
            <HiAcademicCap className="text-accent2" /> Education
          </h3>
          <ol className="relative space-y-5 border-l border-line pl-6">
            {education.map((e) => (
              <li key={e.school} className="relative">
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-night" />
                <div className="card p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-semibold text-white">{e.school}</h4>
                    <span className="text-xs text-slate-500">{e.period}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">
                    {e.degree} · {e.place}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-accent2">{e.score}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  )
}
