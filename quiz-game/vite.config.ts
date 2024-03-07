// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
import fs from 'fs';
import path from 'path';

const customManifestPath = path.resolve(__dirname, 'pwa-manifest.json');
const customManifest = JSON.parse(fs.readFileSync(customManifestPath, 'utf-8'));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: customManifest,
    }),
  ],
});
