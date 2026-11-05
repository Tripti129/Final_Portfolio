// Vercel serverless function: GET /api/leetcode
// Fetches public LeetCode stats server-side (browsers can't call LeetCode directly because of CORS)
// and lets Vercel's CDN cache the result for an hour.

const USERNAME = 'Tripti_2006Mittal'

const QUERY = `query stats($u: String!) {
  allQuestionsCount { difficulty count }
  matchedUser(username: $u) {
    profile { ranking }
    submitStatsGlobal { acSubmissionNum { difficulty count submissions } }
    userCalendar { totalActiveDays streak submissionCalendar }
    languageProblemCount { languageName problemsSolved }
  }
  userContestRanking(username: $u) { attendedContestsCount rating globalRanking topPercentage }
}`

export async function getLeetCode(username = USERNAME) {
  const res = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Referer: 'https://leetcode.com',
      'User-Agent': 'Mozilla/5.0 (portfolio stats)',
    },
    body: JSON.stringify({ query: QUERY, variables: { u: username } }),
  })
  if (!res.ok) throw new Error(`LeetCode responded ${res.status}`)
  const { data, errors } = await res.json()
  if (errors || !data?.matchedUser) throw new Error('LeetCode user not found')

  const pick = (list, key) => Object.fromEntries(list.map((x) => [x.difficulty.toLowerCase(), x[key]]))
  const u = data.matchedUser
  const solved = pick(u.submitStatsGlobal.acSubmissionNum, 'count')
  const submissions = pick(u.submitStatsGlobal.acSubmissionNum, 'submissions')
  const totals = pick(data.allQuestionsCount, 'count')
  const contest = data.userContestRanking

  return {
    username,
    solved, // { all, easy, medium, hard }
    totals, // { all, easy, medium, hard }
    acceptedSubmissions: submissions.all,
    ranking: u.profile.ranking,
    contest: contest
      ? {
          rating: Math.round(contest.rating),
          attended: contest.attendedContestsCount,
          globalRanking: contest.globalRanking,
          topPercentage: contest.topPercentage,
        }
      : null,
    activeDays: u.userCalendar.totalActiveDays,
    streak: u.userCalendar.streak,
    // { "unixSeconds": count }
    calendar: JSON.parse(u.userCalendar.submissionCalendar || '{}'),
    languages: u.languageProblemCount
      .map((l) => ({ name: l.languageName, solved: l.problemsSolved }))
      .sort((a, b) => b.solved - a.solved),
    fetchedAt: new Date().toISOString(),
  }
}

export default async function handler(req, res) {
  try {
    const stats = await getLeetCode()
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(stats))
  } catch (err) {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 502
    res.end(JSON.stringify({ error: err.message }))
  }
}
