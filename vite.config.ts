import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Actions passes the actual Pages path, so any repository name works.
const basePath = process.env.BASE_PATH ?? '/';

export default defineConfig({
  plugins: [react()],
  base: basePath.endsWith('/') ? basePath : `${basePath}/`,
});
