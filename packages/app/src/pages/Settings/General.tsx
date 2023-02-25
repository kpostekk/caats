import { useGqlClient } from '../../components'
import { useUserProfileQuery, useUserQuery } from '../../gql/react-query'

export default function GeneralSettings() {
  const client = useGqlClient()
  const user = useUserProfileQuery(client)

  return (
    <div className="prose">
      <h2>Ogólne</h2>
      <p className="border-y-warning text-warning border-y-2 p-2 font-semibold italic">
        Work in progress
      </p>
      <h3>Profil</h3>
      <p>
        Imię i nazwisko:{' '}
        <span className="font-bold">{user.data?.user.name}</span>
      </p>
      <p>
        Email: <span className="font-bold">{user.data?.user.email}</span>
      </p>
    </div>
  )
}
