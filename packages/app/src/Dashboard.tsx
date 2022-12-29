import { useAuthStore } from './states/auth'
import { useAllNextEventsQuery } from './gql/react-query'
import { gqlClient } from './gql-client'
import { GraphQLClient } from 'graphql-request'
import { DateTime } from 'luxon'
import { Link } from 'react-router-dom'

function Greeting() {
  const [userName] = useAuthStore(({ auth }) => [
    auth?.user.name ?? 'nieznajomy',
  ])
  const now = DateTime.local()

  const [name] = userName.split(' ')

  if (now.hour > 1 && now.hour < 6) return <>Idź spać {name} ಠ_ಠ</>
  if (now.hour >= 6 && now.hour < 12)
    return (
      <>
        Dzień dobry {name} {'(✿◡‿◡)'}
      </>
    )
  if (now.hour >= 12 && now.hour < 18) return <>Hejka {name} （＾∀＾●）ﾉｼ</>
  if (now.hour >= 18 && now.hour < 22)
    return (
      <>
        Dobry wieczór {name} {'(◕‿◕✿)'}
      </>
    )
  if (now.hour >= 22 || now.hour <= 1)
    return (
      <>
        Dobranoc {name} {'(。・∀・)ノ'}
      </>
    )

  return <>Cześć, {name}</>
}

export function Dashboard() {
  const [token] = useAuthStore(({ auth }) => [auth?.accessToken])
  const authGqlClient = gqlClient.setHeader('Authorization', `Bearer ${token}`)
  const events = useAllNextEventsQuery(authGqlClient)

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-3 gap-4">
      {events.data ? (
        <div className="card card-bordered col-span-2">
          <div className="card-body prose">
            <div className="card-title">
              <Greeting />
            </div>
            <h4>Najbliższe zajęcia</h4>
            <ul>
              {events.data.getScheduleUser.slice(0, 4).map((ev, i) => (
                <li key={i}>
                  {DateTime.fromISO(ev.startsAt).toFormat('HH:mm, EEEE')}
                  {' - '}
                  {ev.code}
                </li>
              ))}
            </ul>
            <Link className="btn btn-outline self-start" to="/app/calendar">
              Przejdź do planu zajęć
            </Link>
          </div>
        </div>
      ) : (
        <div className="card bg-base-300 col-span-2 h-20 animate-pulse" />
      )}
      <div className="card card-bordered">
        <div className="card-body">
          <div className="card-title">Ustawienia</div>
          <Link className="btn btn-outline" to="/app/settings/groups">
            Konfiguruj grupy
          </Link>
          <Link className="btn btn-outline" to="/app/ics">
            Zarządzaj linkami .ICS
          </Link>
          <Link className="btn btn-outline" to="/app/su/history">
            Historia scrapowania
          </Link>
        </div>
      </div>
    </div>
  )
}
