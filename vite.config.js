import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const EVENTS_DIR = 'src/content/events'
const ADMIN_CONFIG = '.pages.yml'

/**
 * Serves and builds one "Add to calendar" .ics file per event, straight from
 * the event files the admin edits (src/content/events/*.json). Nothing to run
 * and nothing on disk: add an event and its file exists, in the local preview
 * and on the live site alike.
 *
 * Real files matter because iPhones only reliably open "Add to Calendar" for
 * a served calendar file; in-page downloads tend to land in Files instead.
 *
 * Checks, and what each does when it trips:
 * - A malformed event (entered through the admin) is skipped and reported.
 *   The rest of the site still deploys -- one editor's mistake must never
 *   block everyone else's updates.
 * - The admin's location dropdown drifting out of sync with the room registry
 *   is a developer mistake, so that one fails the build.
 */
function calendarFiles() {
  let command

  const readEvents = () =>
    readdirSync(EVENTS_DIR)
      .filter((f) => f.endsWith('.json'))
      .sort()
      .map((f) => ({ file: f, ...JSON.parse(readFileSync(join(EVENTS_DIR, f), 'utf8')) }))

  // In the preview, load through Vite so edits apply without a restart. At
  // build time, plain imports are fine.
  const loadLib = async (server) => {
    const [events, locations] = server
      ? await Promise.all([server.ssrLoadModule('/src/lib/events.js'), server.ssrLoadModule('/src/lib/locations.js')])
      : await Promise.all([
          import(pathToFileURL(resolve('src/lib/events.js')).href),
          import(pathToFileURL(resolve('src/lib/locations.js')).href),
        ])
    return { lib: events, KNOWN_ROOMS: locations.KNOWN_ROOMS }
  }

  // Rooms listed in the admin dropdown, between the rooms:start/end markers.
  const adminRooms = () => {
    const text = readFileSync(ADMIN_CONFIG, 'utf8')
    const block = text.match(/# rooms:start[^\n]*\n([\s\S]*?)\n\s*# rooms:end/)
    if (!block) return null
    return [...block[1].matchAll(/name:\s*("(?:[^"\\]|\\.)*")/g)].map((m) => JSON.parse(m[1]))
  }

  const roomSyncProblems = (KNOWN_ROOMS) => {
    const listed = adminRooms()
    if (!listed) return [`${ADMIN_CONFIG}: could not find the "# rooms:start" / "# rooms:end" markers`]
    const inAdminOnly = listed.filter((r) => !KNOWN_ROOMS.includes(r))
    const inRegistryOnly = KNOWN_ROOMS.filter((r) => !listed.includes(r))
    return [
      ...inAdminOnly.map((r) => `"${r}" is in the ${ADMIN_CONFIG} dropdown but not in ROOMS in src/lib/locations.js`),
      ...inRegistryOnly.map((r) => `"${r}" is in ROOMS in src/lib/locations.js but missing from the ${ADMIN_CONFIG} dropdown`),
    ]
  }

  const eventReport = (lib, events) =>
    lib
      .validateEvents(events)
      .map((p) => {
        const n = Number(p.match(/^Event (\d+)/)?.[1])
        return events[n - 1] ? `${p}  [${EVENTS_DIR}/${events[n - 1].file}]` : p
      })

  const block = (title, lines) => `\n\n${title}\n${lines.map((l) => `  - ${l}`).join('\n')}\n`

  const previewCheck = async (file, server) => {
    const touchesEvents = file.includes(`/${EVENTS_DIR}/`) && file.endsWith('.json')
    const touchesConfig = file.endsWith(`/${ADMIN_CONFIG}`) || file.endsWith('/src/lib/locations.js')
    if ((!touchesEvents && !touchesConfig) || !existsSync(EVENTS_DIR)) return
    const { lib, KNOWN_ROOMS } = await loadLib(server)
    const lines = [...roomSyncProblems(KNOWN_ROOMS), ...eventReport(lib, readEvents())]
    if (lines.length) server.config.logger.warn(block('Content problems:', lines), { timestamp: true })
  }

  return {
    name: 'lavin-calendar-files',

    configResolved(config) {
      command = config.command
    },

    async buildStart() {
      if (command !== 'build') return
      const { lib, KNOWN_ROOMS } = await loadLib()

      const sync = roomSyncProblems(KNOWN_ROOMS)
      if (sync.length) this.error(block('The admin location list and the room registry disagree:', sync))

      const events = readEvents()
      const problems = eventReport(lib, events)
      if (problems.length) {
        const bad = events.filter((e) => lib.eventProblems(e).length > 0).length
        this.warn(block(`Skipping ${bad} malformed event entr${bad === 1 ? 'y' : 'ies'} (the rest of the site still deploys):`, problems))
      }
    },

    async generateBundle() {
      const { lib } = await loadLib()
      for (const event of readEvents().filter((e) => lib.eventProblems(e).length === 0)) {
        this.emitFile({
          type: 'asset',
          fileName: `calendar/${lib.eventSlug(event)}.ics`,
          source: lib.buildIcs(lib.normalizeEvent(event)),
        })
      }
    },

    configureServer(server) {
      // handleHotUpdate misses brand-new files, so check those as they appear.
      server.watcher.on('add', (file) => previewCheck(file, server))

      server.middlewares.use(async (req, res, next) => {
        const match = req.url?.match(/^\/calendar\/([^/?#]+)\.ics(?:[?#]|$)/)
        if (!match) return next()
        try {
          const { lib } = await loadLib(server)
          const event = readEvents().find((e) => lib.eventProblems(e).length === 0 && lib.eventSlug(e) === match[1])
          if (!event) {
            res.statusCode = 404
            return res.end('No event with that name.')
          }
          res.setHeader('Content-Type', 'text/calendar; charset=utf-8')
          res.end(lib.buildIcs(lib.normalizeEvent(event)))
        } catch (err) {
          next(err)
        }
      })
    },

    // Flag a bad edit the moment it's saved in the preview.
    async handleHotUpdate({ file, server }) {
      await previewCheck(file, server)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), imagetools(), calendarFiles()],
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
