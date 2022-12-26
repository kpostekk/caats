import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import codegen from 'vite-plugin-graphql-codegen'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    codegen({
      config: {
        overwrite: true,
        schema: 'http://localhost:3000/graphql',
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
      '/graphql': 'http://localhost:3000',
    },
  },
})
