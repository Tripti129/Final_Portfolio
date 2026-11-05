// Saves a fallback copy of the live coding stats into src/data/codingSnapshot.json.
// Run with: node scripts/snapshot-stats.mjs
import { writeFileSync } from 'node:fs'
import { getLeetCode } from '../api/leetcode.js'
import { getGitHub } from '../api/github.js'

const [leetcode, github] = await Promise.all([getLeetCode(), getGitHub()])
writeFileSync(new URL('../src/data/codingSnapshot.json', import.meta.url), JSON.stringify({ leetcode, github }, null, 2) + '\n')
console.log('Saved snapshot:', leetcode.solved.all, 'solved;', github.publicRepos, 'repos')
