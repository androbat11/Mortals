import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // A relative base makes the built files work at the root of a domain or under
  // any sub-path (such as a project address), with no setting per host. The
  // routes live in the URL hash, so a static host needs no rewrite rules.
  base: './',
  build: {
    // Three.js alone is about 560 kB. It is loaded lazily, only by the fatality
    // page, and the rest of the app is under 250 kB, so the default 500 kB
    // warning would only repeat a known, accepted size.
    chunkSizeWarningLimit: 700,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
})
