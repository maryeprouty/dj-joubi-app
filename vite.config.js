import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mkcert()
  ],
  server: {
      proxy: {
        '/api': {
          target: 'https://dj-joubi-d0bdbvdta9hycrc5.eastus2-01.azurewebsites.net',
          changeOrigin: true,
          secure: true
        },
      },
    },
})
