import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: isSsrBuild
    ? {
        // Build-time only bundle consumed by scripts/prerender.mjs; never deployed.
        outDir: 'dist-ssr',
        copyPublicDir: false,
        emptyOutDir: true,
      }
    : {
        outDir: 'dist',
      },
}))
