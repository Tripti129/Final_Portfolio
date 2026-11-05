import { FaGithub } from 'react-icons/fa'
import { HiExternalLink, HiUserGroup, HiCheckCircle, HiFolder } from 'react-icons/hi'
import Section, { Reveal } from './Section'
import { Tilt } from './Interactive'
import { projects, otherProjects } from '../data/portfolio'

function Preview({ project }) {
  if (project.image) {
    return <img src={project.image} alt={project.title} className="h-full w-full object-cover object-top" />
  }
  // Placeholder "app window" until real screenshots are added
  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-br from-accent/25 via-surface to-accent2/15">
      <div className="flex gap-1.5 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
      </div>
      <div className="grid flex-1 place-items-center">
        <span className="font-display text-3xl font-bold text-white/90">{project.title}</span>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Things I've built">
      <div className="grid gap-8 lg:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
          <Tilt max={4} className="card group flex h-full flex-col overflow-hidden hover:shadow-glow">
            <div className="aspect-video overflow-hidden border-b border-line transition-transform duration-500 group-hover:scale-[1.02]">
              <Preview project={p} />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                {p.team && (
                  <span className="chip inline-flex items-center gap-1">
                    <HiUserGroup /> Team project
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm font-medium text-accent2">{p.subtitle}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">{p.description}</p>

              <ul className="mt-4 space-y-1.5 text-sm text-slate-300">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2">
                    <HiCheckCircle className="shrink-0 text-accent" /> {h}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex gap-3 pt-6">
                <a href={p.github} target="_blank" rel="noreferrer" className="btn-ghost !px-5 !py-2.5">
                  <FaGithub /> Code
                </a>
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer" className="btn-primary !px-5 !py-2.5">
                    <HiExternalLink /> Live demo
                  </a>
                )}
              </div>
            </div>
          </Tilt>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <h3 className="mb-6 mt-20 text-2xl font-semibold">More projects</h3>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {otherProjects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 4) * 0.06} className="card flex flex-col p-5">
            <div className="mb-4 flex items-center justify-between text-xl">
              <HiFolder className="text-accent2" />
              <span className="flex gap-3 text-slate-400">
                <a href={p.github} target="_blank" rel="noreferrer" aria-label={`${p.title} code`} className="hover:text-white"><FaGithub /></a>
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer" aria-label={`${p.title} live demo`} className="hover:text-white"><HiExternalLink /></a>
                )}
              </span>
            </div>
            <h4 className="font-semibold text-white">{p.title}</h4>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{p.description}</p>
            <p className="mt-4 text-xs text-slate-500">{p.tech.join(' · ')}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 text-center">
        <a href="https://github.com/Tripti129?tab=repositories" target="_blank" rel="noreferrer" className="btn-ghost">
          <FaGithub /> See all on GitHub
        </a>
      </Reveal>
    </Section>
  )
}
