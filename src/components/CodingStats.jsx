import { useEffect, useMemo, useRef, useState } from 'react'
import { animate, motion, useInView } from 'framer-motion'
import { SiLeetcode } from 'react-icons/si'
import { FaGithub, FaLinkedinIn, FaStar, FaUsers, FaFire, FaCode } from 'react-icons/fa'
import { HiArrowUpRight, HiTrophy, HiChartBar, HiGlobeAlt, HiCalendarDays, HiFolder } from 'react-icons/hi2'
import Section, { Reveal } from './Section'
import { profile } from '../data/portfolio'
import snapshot from '../data/codingSnapshot.json'

// Loads live stats from our /api function; falls back to the saved snapshot.
function useStats(url, fallback) {
  const [state, setState] = useState({ data: fallback, live: false })
  useEffect(() => {
    let alive = true
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => alive && !data.error && setState({ data, live: true }))
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [url])
  return state
}

function CountUp({ value, format = (n) => n.toLocaleString('en-IN') }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [shown, setShown] = useState(0)
  useEffect(() => {
    if (!inView || typeof value !== 'number') return
    const controls = animate(0, value, { duration: 1.4, ease: 'easeOut', onUpdate: (v) => setShown(Math.round(v)) })
    return () => controls.stop()
  }, [inView, value])
  return <span ref={ref}>{typeof value === 'number' ? format(shown) : value}</span>
}

function LiveBadge({ live }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
        live ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300' : 'border-line bg-white/5 text-slate-400'
      }`}
      title={live ? 'Fetched live, refreshed hourly' : 'Showing saved data'}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${live ? 'animate-pulse bg-emerald-400' : 'bg-slate-500'}`} />
      {live ? 'live' : 'cached'}
    </span>
  )
}

function CardHeader({ icon: Icon, iconClass, title, handle, href, live }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className={`grid h-10 w-10 place-items-center rounded-xl bg-white/[0.05] text-xl ${iconClass}`}>
        <Icon />
      </span>
      <div className="min-w-0">
        <h3 className="text-base font-semibold leading-tight">{title}</h3>
        <p className="truncate font-mono text-xs text-slate-500">@{handle}</p>
      </div>
      <div className="ml-auto flex items-center gap-2">
        {live !== undefined && <LiveBadge live={live} />}
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${title} profile`}
          className="grid h-8 w-8 place-items-center rounded-full border border-line text-slate-400 transition-colors hover:border-accent hover:text-white"
        >
          <HiArrowUpRight />
        </a>
      </div>
    </div>
  )
}

function Tile({ icon: Icon, label, children }) {
  return (
    <div className="rounded-xl border border-line bg-white/[0.02] p-3">
      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
        <Icon className="shrink-0" /> {label}
      </div>
      <div className="mt-1 font-display text-lg font-bold text-white">{children}</div>
    </div>
  )
}

const DIFFS = [
  { key: 'easy', label: 'Easy', color: '#2dd4bf', text: 'text-teal-300' },
  { key: 'medium', label: 'Medium', color: '#fbbf24', text: 'text-amber-300' },
  { key: 'hard', label: 'Hard', color: '#f43f5e', text: 'text-rose-400' },
]

function Donut({ solved, total }) {
  const r = 52
  const c = 2 * Math.PI * r
  const gap = 4
  let offset = 0
  return (
    <div className="relative h-40 w-40 shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
        {DIFFS.map((d) => {
          const len = Math.max((solved[d.key] / solved.all) * c - gap, 0)
          const el = (
            <motion.circle
              key={d.key}
              cx="60"
              cy="60"
              r={r}
              fill="none"
              stroke={d.color}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDashoffset={-offset}
              initial={{ strokeDasharray: `0 ${c}` }}
              whileInView={{ strokeDasharray: `${len} ${c}` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          )
          offset += len + gap
          return el
        })}
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <div className="font-display text-4xl font-bold text-white">
          <CountUp value={solved.all} />
        </div>
        <div className="text-[11px] text-slate-400">of {total.toLocaleString('en-IN')} solved</div>
      </div>
    </div>
  )
}

function Heatmap({ calendar }) {
  const { weeks, submissions } = useMemo(() => {
    const counts = {}
    for (const [ts, n] of Object.entries(calendar || {})) {
      counts[new Date(Number(ts) * 1000).toISOString().slice(0, 10)] = n
    }
    const today = new Date()
    const end = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()))
    const start = new Date(end)
    start.setUTCDate(start.getUTCDate() - 7 * 26 - start.getUTCDay()) // ~6 months, starting on a Sunday
    const weeks = []
    let total = 0
    for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
      if (d.getUTCDay() === 0) weeks.push([])
      const key = d.toISOString().slice(0, 10)
      const n = counts[key] || 0
      total += n
      weeks[weeks.length - 1].push({ key, n })
    }
    return { weeks, submissions: total }
  }, [calendar])

  const level = (n) =>
    n === 0 ? 'bg-white/[0.05]' : n < 3 ? 'bg-teal-900' : n < 6 ? 'bg-teal-700' : n < 10 ? 'bg-teal-500' : 'bg-teal-300'

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
        <span className="inline-flex items-center gap-1.5">
          <HiCalendarDays /> Last 6 months
        </span>
        <span>
          <span className="font-semibold text-white">{submissions}</span> submissions
        </span>
      </div>
      <div className="flex gap-[3px] overflow-x-auto pb-1">
        {weeks.map((w, i) => (
          <div key={i} className="flex flex-col gap-[3px]">
            {w.map((d) => (
              <span
                key={d.key}
                title={`${d.n} submission${d.n === 1 ? '' : 's'} on ${d.key}`}
                className={`h-[11px] w-[11px] rounded-[3px] ${level(d.n)}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function LeetCodeCard({ data, live }) {
  return (
    <div className="card h-full p-5 sm:p-6">
      <CardHeader
        icon={SiLeetcode}
        iconClass="text-[#FFA116]"
        title="LeetCode"
        handle={data.username}
        href={profile.socials.leetcode}
        live={live}
      />

      <div className="flex flex-col items-center gap-6 sm:flex-row">
        <Donut solved={data.solved} total={data.totals.all} />
        <div className="w-full space-y-4">
          {DIFFS.map((d) => (
            <div key={d.key}>
              <div className="mb-1.5 flex justify-between text-sm">
                <span className={d.text}>{d.label}</span>
                <span className="text-slate-400">
                  <span className="font-semibold text-white">{data.solved[d.key]}</span> / {data.totals[d.key]}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: d.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(data.solved[d.key] / data.totals[d.key]) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Tile icon={HiTrophy} label="Contest rating">
          {data.contest ? <CountUp value={data.contest.rating} /> : '—'}
        </Tile>
        <Tile icon={HiChartBar} label="Contests">
          {data.contest ? <CountUp value={data.contest.attended} /> : '—'}
        </Tile>
        <Tile icon={HiGlobeAlt} label="Global rank">
          #<CountUp value={data.ranking} />
        </Tile>
        <Tile icon={FaFire} label="Active days">
          <CountUp value={data.activeDays} />
        </Tile>
      </div>

      <div className="mt-6">
        <Heatmap calendar={data.calendar} />
      </div>
    </div>
  )
}

const LANG_COLORS = ['bg-yellow-300', 'bg-orange-500', 'bg-sky-400', 'bg-pink-400']
const LANG_DOTS = ['bg-yellow-300', 'bg-orange-500', 'bg-sky-400', 'bg-pink-400']

function GitHubCard({ data, live }) {
  const langs = data.languages.filter((l) => l.percent > 0)
  return (
    <div className="card h-full p-5 sm:p-6">
      <CardHeader icon={FaGithub} iconClass="text-white" title="GitHub" handle={data.username} href={data.url} live={live} />

      <div className="grid grid-cols-3 gap-3">
        <Tile icon={HiFolder} label="Repos">
          <CountUp value={data.publicRepos} />
        </Tile>
        <Tile icon={FaStar} label="Stars">
          <CountUp value={data.stars} />
        </Tile>
        <Tile icon={FaUsers} label="Followers">
          <CountUp value={data.followers} />
        </Tile>
      </div>

      <p className="mb-2 mt-6 text-xs font-medium text-slate-400">Top languages</p>
      <div className="flex h-2 overflow-hidden rounded-full bg-white/[0.06]">
        {langs.map((l, i) => (
          <motion.div
            key={l.name}
            className={LANG_COLORS[i]}
            initial={{ width: 0 }}
            whileInView={{ width: `${l.percent}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: i * 0.1 }}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-300">
        {langs.map((l, i) => (
          <span key={l.name} className="inline-flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${LANG_DOTS[i]}`} />
            {l.name} <span className="text-slate-500">{l.percent}%</span>
          </span>
        ))}
      </div>

      <p className="mb-2 mt-6 text-xs font-medium text-slate-400">Recently pushed</p>
      <ul className="space-y-1">
        {data.recent.map((r) => (
          <li key={r.name}>
            <a
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-lg px-2 py-1.5 font-mono text-sm text-slate-200 transition-colors hover:bg-white/[0.05]"
            >
              <span className="truncate">{r.name}</span>
              <HiArrowUpRight className="shrink-0 text-slate-500 transition-colors group-hover:text-white" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function LanguagesCard({ data }) {
  const max = Math.max(...data.languages.map((l) => l.solved), 1)
  return (
    <div className="card h-full p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.05] text-xl text-accent2">
          <FaCode />
        </span>
        <div>
          <h3 className="text-base font-semibold leading-tight">Languages I solve in</h3>
          <p className="text-xs text-slate-500">Problems solved per language on LeetCode</p>
        </div>
      </div>
      <ul className="space-y-3">
        {data.languages.slice(0, 4).map((l) => (
          <li key={l.name}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-slate-200">{l.name}</span>
              <span className="font-semibold text-white">{l.solved}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent2"
                initial={{ width: 0 }}
                whileInView={{ width: `${(l.solved / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function StreakCard({ data }) {
  return (
    <div className="card relative h-full overflow-hidden p-5 sm:p-6">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-500/15 text-xl text-orange-400">
          <FaFire />
        </span>
        <div>
          <h3 className="text-base font-semibold leading-tight">Consistency</h3>
          <p className="text-xs text-slate-500">Showing up, one problem at a time</p>
        </div>
      </div>
      <div className="font-display text-5xl font-bold text-white">
        <CountUp value={data.streak} />
        <span className="ml-2 text-lg font-semibold text-slate-400">day streak</span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Tile icon={HiCalendarDays} label="Active days">
          <CountUp value={data.activeDays} />
        </Tile>
        <Tile icon={HiChartBar} label="Accepted">
          <CountUp value={data.acceptedSubmissions} />
        </Tile>
      </div>
      {data.contest && (
        <p className="mt-4 text-xs text-slate-400">
          Contest rank <span className="font-semibold text-white">#{data.contest.globalRanking.toLocaleString('en-IN')}</span>{' '}
          across {data.contest.attended} rated contests.
        </p>
      )}
    </div>
  )
}

function LinkedInCard() {
  return (
    <div className="card flex h-full flex-col p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#0A66C2] text-xl text-white">
          <FaLinkedinIn />
        </span>
        <div>
          <h3 className="text-base font-semibold leading-tight">Let&apos;s connect on LinkedIn</h3>
          <p className="mt-1 text-sm text-slate-400">
            Projects, hackathons, certifications and what I&apos;m learning next, shared as I go.
          </p>
        </div>
      </div>
      <a
        href={profile.socials.linkedin}
        target="_blank"
        rel="noreferrer"
        className="mt-auto inline-flex w-fit items-center gap-2 self-start rounded-full bg-[#0A66C2] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
      >
        linkedin.com/in/-tripti-mittal <HiArrowUpRight />
      </a>
    </div>
  )
}

export default function CodingStats() {
  const lc = useStats('/api/leetcode', snapshot.leetcode)
  const gh = useStats('/api/github', snapshot.github)

  return (
    <Section id="coding" eyebrow="Coding profile" title="The numbers, live">
      <Reveal>
        <p className="-mt-8 mb-10 text-sm text-slate-400">
          Pulled straight from LeetCode and GitHub and refreshed every hour.
        </p>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <LeetCodeCard data={lc.data} live={lc.live} />
        </Reveal>
        <Reveal delay={0.08}>
          <GitHubCard data={gh.data} live={gh.live} />
        </Reveal>
        <Reveal delay={0.04}>
          <LanguagesCard data={lc.data} />
        </Reveal>
        <Reveal delay={0.08}>
          <StreakCard data={lc.data} />
        </Reveal>
        <Reveal delay={0.12}>
          <LinkedInCard />
        </Reveal>
      </div>
    </Section>
  )
}
