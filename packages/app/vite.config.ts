import { defineConfig } from 'vite'
import { readFile } from 'fs/promises'
import react from '@vitejs/plugin-react-swc'
import codegen from 'vite-plugin-graphql-codegen'

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
  ],
  server: {
    proxy: {
      '/graphql': 'http://127.0.0.1:3000',
      '/graphiql': 'http://127.0.0.1:3000',
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
