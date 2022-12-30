import { GraphQLClient } from 'graphql-request'
import { useAuthStore } from '../../states/auth'

export const gqlClient = new GraphQLClient('/graphql')

export function useGqlClient() {
  const token = useAuthStore(({ auth }) => auth?.accessToken)

  if (!token) return gqlClient

  return gqlClient.setHeader('Authorization', `Bearer ${token}`)
}
