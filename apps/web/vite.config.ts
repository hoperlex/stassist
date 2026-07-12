import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vike from 'vike/plugin';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), vike(), tsconfigPaths()],
  ssr: {
    // @stassist/* — рабочие пакеты монорепозитория, отдаются как TS-исходники (см. корневой
    // tsconfig.base.json paths), их нужно прогонять через vite/esbuild, а не require()-ить как
    // готовый CJS/ESM.
    noExternal: [/^@stassist\//],
  },
});
