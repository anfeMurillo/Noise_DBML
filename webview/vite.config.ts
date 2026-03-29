import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, '..', 'dist', 'webview'),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'src', 'main.tsx'),
      output: {
        entryFileNames: 'index.js',
        assetFileNames: 'index.[ext]',
        // Single chunk for webview (no code splitting)
        manualChunks: undefined,
        inlineDynamicImports: true,
      },
    },
    // For VS Code webview — no module scripts allowed
    target: 'es2020',
    minify: true,
    sourcemap: false,
    cssCodeSplit: false,
  },
  // No server needed — this is built and loaded by the extension
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
});
