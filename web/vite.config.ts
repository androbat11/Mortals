import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
