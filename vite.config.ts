import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  define: {
    'global': 'window', 
  },
  server: {
    // allowedHosts: [
    //   'local.haiemdavang.id.vn', 
    // ],
    // hmr: {
    //     host: 'local.haiemdavang.id.vn',
    //     // clientPort: 80,
    // },
  }
})
