import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  silent: true,
  schema: '../nest/src/**/*.gql',
  documents: ['operations/*.gql'],
  //emitLegacyCommonJSImports: false,
  generates: {
    'src/gql/react-query.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
      config: {
        fetcher: 'graphql-request',
        reactQueryVersion: 5,
        scalars: {
          DateTime: 'string',
          Date: 'string',
          Time: 'string',
          JSON: 'Record<string, unknown>',
        },
      },
    },
  },
}

export default config
