import { useEffect, useState } from 'react'
import { SiLeetcode } from 'react-icons/si'
import { HiExternalLink } from 'react-icons/hi'
import Section, { Reveal } from './Section'
import { profile } from '../data/portfolio'

// Shown if the (unofficial) LeetCode stats API is unavailable
const FALLBACK = { total: '600+', easy: null, medium: null, hard: null, live: false }

async function fetchStats(user) {
  const sources = [
    async () => {
      const r = await fetch(`https://alfa-leetcode-api.onrender.com/${user}/solved`)
      const d = await r.json()
      return { total: d.solvedProblem, easy: d.easySolved, medium: d.mediumSolved, hard: d.hardSolved }
    },
    async () => {
      const r = await fetch(`https://leetcode-stats-api.herokuapp.com/${user}`)
      const d = await r.json()
      return { total: d.totalSolved, easy: d.easySolved, medium: d.mediumSolved, hard: d.hardSolved }
    },
  ]
  for (const src of sources) {
    try {
      const s = await src()
      if (Number.isFinite(s.total) && s.total > 0) return { ...s, live: true }
    } catch {
      /* try next source */
    }
  }
  return FALLBACK
}

const bars = [
  { key: 'easy', label: 'Easy', color: 'bg-emerald-400' },
  { key: 'medium', label: 'Medium', color: 'bg-amber-400' },
  { key: 'hard', label: 'Hard', color: 'bg-rose-500' },
]

export default function CodingStats() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    let alive = true
    fetchStats(profile.leetcodeUsername).then((s) => alive && setStats(s))
    return () => {
      alive = false
    }
  }, [])

  const s = stats || FALLBACK
  const hasBreakdown = s.easy != null

  return (
    <Section id="coding" eyebrow="Problem solving" title="Coding profile">
      <Reveal className="card grid gap-8 p-6 sm:p-8 md:grid-cols-[auto_1fr] md:items-center">
        <div className="flex items-center gap-5">
          <div className="grid h-20 w-20 place-items-center rounded-2xl bg-[#FFA116]/10 text-4xl text-[#FFA116]">
            <SiLeetcode />
          </div>
          <div>
            <div className="font-display text-5xl font-bold text-white">{stats ? s.total : '…'}</div>
            <div className="text-sm text-slate-400">problems solved on LeetCode</div>
          </div>
        </div>

        <div className="space-y-4">
          {hasBreakdown ? (
            bars.map((b) => (
              <div key={b.key}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="text-slate-300">{b.label}</span>
                  <span className="font-semibold text-white">{s[b.key]}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <div className={`h-full rounded-full ${b.color}`} style={{ width: `${(s[b.key] / s.total) * 100}%` }} />
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm leading-relaxed text-slate-400">
              Consistent DSA practice across arrays, strings, recursion, trees, graphs and dynamic programming,
              building on 500+ problems solved during the Coding Blocks internship.
            </p>
          )}
          <a
            href={profile.socials.leetcode}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-white"
          >
            Visit LeetCode profile <HiExternalLink />
          </a>
        </div>
      </Reveal>
    </Section>
  )
}
