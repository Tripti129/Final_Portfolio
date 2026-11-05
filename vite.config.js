import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// In production, Vercel runs the functions in /api. During `npm run dev`,
// this small plugin serves the same handlers so the stats work locally too.
const localApi = () => ({
  name: 'local-api',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const match = req.url && req.url.match(/^\/api\/([a-z-]+)(?:\?|$)/)
      if (!match) return next()
      try {
        const mod = await server.ssrLoadModule(`/api/${match[1]}.js`)
        await mod.default(req, res)
      } catch (err) {
        res.statusCode = 404
        res.end(JSON.stringify({ error: err.message }))
      }
    })
  },
})

export default defineConfig({
  plugins: [react(), localApi()],
})
