import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy:{
      "/api":{    //whenever the frontend makes a request that starts with /api it gets forwarded to "http://localhost:3000"
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
