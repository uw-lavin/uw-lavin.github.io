import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

/**
 * Serves and builds one "Add to calendar" .ics file per event, straight from
 * src/data/events.js. Nothing to run and nothing on disk: add an event and its
 * file exists, in the local preview and in the deployed site alike.
 *
 * Real files matter because iPhones only reliably open "Add to Calendar" for
 * a served calendar file; in-page downloads tend to land in Files instead.
 *
 * It also checks every event and fails the build on a malformed one, so a
 * typo can't reach the live site.
 */
function calendarFiles() {
  let command

  // In the preview, load through Vite so edits are picked up without a
  // restart. At build time, plain imports are fine.
  const load = async (server) => {
    const [{ events }, lib] = server
      ? await Promise.all([
          server.ssrLoadModule('/src/data/events.js'),
          server.ssrLoadModule('/src/lib/events.js'),
        ])
      : await Promise.all([
          import(pathToFileURL(resolve('src/data/events.js')).href),
          import(pathToFileURL(resolve('src/lib/events.js')).href),
        ])
    return { events, lib }
  }

  const report = (problems) =>
    `\n\nsrc/data/events.js has ${problems.length} problem(s):\n` +
    problems.map((p) => `  - ${p}`).join('\n') +
    '\n'

  return {
    name: 'lavin-calendar-files',

    configResolved(config) {
      command = config.command
    },

    async buildStart() {
      if (command !== 'build') return
      const { events, lib } = await load()
      const problems = lib.validateEvents(events)
      if (problems.length) this.error(report(problems))
    },

    async generateBundle() {
      const { events, lib } = await load()
      for (const event of events) {
        this.emitFile({
          type: 'asset',
          fileName: `calendar/${lib.eventSlug(event)}.ics`,
          source: lib.buildIcs(event),
        })
      }
    },

    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const match = req.url?.match(/^\/calendar\/([^/?#]+)\.ics(?:[?#]|$)/)
        if (!match) return next()
        try {
          const { events, lib } = await load(server)
          const event = events.find((e) => lib.eventSlug(e) === match[1])
          if (!event) {
            res.statusCode = 404
            return res.end('No event with that name.')
          }
          res.setHeader('Content-Type', 'text/calendar; charset=utf-8')
          res.end(lib.buildIcs(event))
        } catch (err) {
          next(err)
        }
      })
    },

    // Flag a bad edit the moment it's saved, rather than at deploy time.
    async handleHotUpdate({ file, server }) {
      if (!file.endsWith('/src/data/events.js')) return
      const { events, lib } = await load(server)
      const problems = lib.validateEvents(events)
      if (problems.length) server.config.logger.error(report(problems), { timestamp: true })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), calendarFiles()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
})
