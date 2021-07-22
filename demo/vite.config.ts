import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import remarkHtml from 'vite-remark-html'

export default defineConfig({
  plugins: [
    reactRefresh(),
    remarkHtml(),
  ],
})
