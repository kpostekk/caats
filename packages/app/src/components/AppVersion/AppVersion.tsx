import { useAppQuery } from '../../gql/react-query'
import { useGqlClient } from '../useGqlClient/useGqlClient'

export function AppVersion() {
  const client = useGqlClient()
  const appQuery = useAppQuery(client)

  return (
    <>
      {appQuery.data ? (
        <p className="text-base-300 my-2">
          nest: v{appQuery.data.app?.version}, app: v{APP_VERSION}
        </p>
      ) : (
        <div className="bg-base-300 h-2 w-1/3 animate-pulse rounded" />
      )}
    </>
  )
}
