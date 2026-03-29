import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',           // Look for index.html in the current folder
  publicDir: 'public', // Static assets like images go here
  server: {
    port: 3000,        // Keeps it consistent with your previous CRA port
    open: true         // Automatically opens the browser on 'npm run dev'
  }
});