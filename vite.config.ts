import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/layouter.ts'),
      name: 'Layouter',
      fileName: (format) => `layouter.${format}.js`
    },
    sourcemap: true
  },
  plugins: [dts()]
})
