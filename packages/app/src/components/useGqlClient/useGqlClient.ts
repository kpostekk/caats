import { GraphQLClient } from 'graphql-request'
import { useAuthStore } from '../../states/auth'

export const gqlClient = new GraphQLClient('/graphql', {
  responseMiddleware: (res) => {
    if (!(res instanceof Error)) return
    if (res.message.startsWith('Unauthorized')) {
      useAuthStore.getState().logout()
    }
  },
})

export function useGqlClient() {
  const token = useAuthStore(({ auth }) => auth?.accessToken)

  if (!token) return gqlClient

  return gqlClient.setHeader('Authorization', `Bearer ${token}`)
}
