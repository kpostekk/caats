import { defineConfig, loadEnv } from 'vite'
import { readFile } from 'fs/promises'
import react from '@vitejs/plugin-react'
import codegen from 'vite-plugin-graphql-codegen'
import { VitePWA as pwa } from 'vite-plugin-pwa'

const backendUrl =
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
          silent: true,
          schema: '../nest/src/**/*.gql',
          documents: ['operations/*.gql'],
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
                scalars: {
                  DateTime: 'string',
                  Date: 'string',
                  Time: 'string',
                  JSON: 'Record<string, unknown>',
                },
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
            src: 'grumpy.webp',
            sizes: '256x256',
            type: 'image/webp',
          },
          {
            purpose: 'maskable',
            src: 'grumpy.webp',
            sizes: '256x256',
            type: 'image/webp',
          },
        ],
        background_color: 'black',
      },
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,png,webp}'],
      },
    }),
  ],
  server: {
    proxy: {
      '/graphql': backendUrl,
      '/graphiql': backendUrl,
      '/docs': backendUrl,
      '/ics': backendUrl,
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          graphql: ['graphql-request', 'graphql'],
          luxon: ['luxon'],
        },
      },
    },
  },
})
