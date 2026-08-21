import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const configData = JSON.parse(fs.readFileSync(path.resolve(__dirname, './src/config/data.json'), 'utf-8'));

export default defineConfig({
  base: './',
  plugins: [
    handlebars({
      context: configData,
    }),
  ],
  build: {
    target: 'es2022',
    assetsInlineLimit: 4096,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          vendor: ['gsap', 'lenis'],
        },
      },
    },
  },
});
