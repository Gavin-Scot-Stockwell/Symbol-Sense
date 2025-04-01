import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000, // Vite development server runs on port 3000
    open: true,
    proxy: {
      // Proxy API requests to the backend server
      '/graphql': {
        target: 'http://localhost:3001', // Backend server address
        changeOrigin: true,
        secure: false,
      },
    },
  },
});