import { defineConfig, loadEnv } from 'vite'
import { readFile } from 'fs/promises'
import react from '@vitejs/plugin-react'
import codegen from 'vite-plugin-graphql-codegen'
import { VitePWA as pwa } from 'vite-plugin-pwa'

const graphql =
  loadEnv('dev', process.cwd()).VITE_GRAPHQL ?? 'http://127.0.0.1:3000'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    APP_VERSION: JSON.stringify(
      JSON.parse(await readFile('./package.json').then((f) => f.toString()))
        .version as string
    ),
  },
  plugins: [
    react(),
    !process.env.SKIPCODEGEN &&
      codegen({
        config: {
          overwrite: true,
          schema: '../nest/src/**/*.gql',
          documents: ['src/**/*.tsx', 'operations/*.gql'],
          //emitLegacyCommonJSImports: false,
          generates: {
            'src/gql/': {
              preset: 'client',
              plugins: [],
            },
            'src/gql/react-query.ts': {
              plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-query',
              ],
              config: {
                fetcher: 'graphql-request',
              },
            },
          },
        },
      }),
    pwa({
      injectRegister: 'inline',
      registerType: 'prompt',
      filename: 'service-worker.js',
      scope: '/app',
      manifest: {
        name: 'CaaTS',
        description: 'Jeszcze lepsza apka do planu zajęć PJATK.',
        lang: 'pl',
        id: '/app',
        start_url: '/app',
        display: 'standalone',
        icons: [
          {
            purpose: 'any',
            src: 'icon.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            purpose: 'maskable',
            src: 'icon.png',
            sizes: '256x256',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  server: {
    proxy: {
      '/graphql': graphql,
      '/graphiql': graphql,
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          lib: [
            'react',
            'react-dom',
            '@tanstack/react-query',
            'react-router-dom',
            'react-use',
            'zustand',
            '@headlessui/react',
          ],
          graphql: ['graphql-request', 'graphql'],
          luxon: ['luxon'],
        },
      },
    },
  },
})
