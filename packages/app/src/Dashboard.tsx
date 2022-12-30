import { useAuthStore } from './states/auth'
import { useAllNextEventsQuery } from './gql/react-query'
import { gqlClient } from './gql-client'
import { GraphQLClient } from 'graphql-request'
import { DateTime } from 'luxon'
import { Link } from 'react-router-dom'
import {
  HiCalendar,
  HiClipboardList,
  HiCubeTransparent,
  HiUserGroup,
} from 'react-icons/hi'

function Greeting() {
  const [userName] = useAuthStore(({ auth }) => [
    auth?.user.name ?? 'nieznajomy',
  ])
  const now = DateTime.local()

  const [name] = userName.split(' ')

  if (now.hour > 1 && now.hour < 6)
    return (
      <>
        Idź spać {name} <span className="whitespace-nowrap">{'ಠ_ಠ'}</span>
      </>
    )
  if (now.hour >= 6 && now.hour < 12)
    return (
      <>
        Dzień dobry {name} <span className="whitespace-nowrap">{'(✿◡‿◡)'}</span>
      </>
    )
  if (now.hour >= 12 && now.hour < 18)
    return (
      <>
        Hejka {name} <span className="whitespace-nowrap">（＾∀＾●）ﾉｼ</span>
      </>
    )
  if (now.hour >= 18 && now.hour < 22)
    return (
      <>
        Dobry wieczór {name}{' '}
        <span className="whitespace-nowrap">{'(◕‿◕✿)'}</span>
      </>
    )
  if (now.hour >= 22 || now.hour <= 1)
    return (
      <>
        Dobranoc {name}{' '}
        <span className="whitespace-nowrap">{'(。・∀・)ノ'}</span>
      </>
    )

  return <>Cześć, {name}</>
}

export function Dashboard() {
  const [token] = useAuthStore(({ auth }) => [auth?.accessToken])
  const authGqlClient = gqlClient.setHeader('Authorization', `Bearer ${token}`)
  const events = useAllNextEventsQuery(authGqlClient)

  return (
    <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
      <div className="grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2">
        <div className="card card-bordered md:col-span-2">
          <div className="card-body prose">
            <h2>
              <Greeting />
            </h2>
          </div>
        </div>
        {events.data ? (
          events.data.getScheduleUser.slice(0, 4).map((ev, i) => (
            <div className="card card-bordered" key={i}>
              <div className="card-body">
                <h3 className="text-xl font-bold">{ev.code}</h3>
                <h4>
                  {DateTime.fromISO(ev.startsAt).toFormat(
                    'HH:mm, EEEE dd MMMM'
                  )}
                </h4>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className="card bg-base-200 h-32 animate-pulse" />
            <div className="card bg-base-200 h-32 animate-pulse" />
            <div className="card bg-base-200 h-32 animate-pulse" />
            <div className="card bg-base-200 h-32 animate-pulse" />
          </>
        )}
      </div>
      <div className="card card-bordered">
        <div className="card-body">
          <a className="btn btn-outline" href="/graphiql">
            <HiCubeTransparent className="mr-2" /> GraphiQL
          </a>
          <Link className="btn btn-outline" to="/app/settings/groups">
            <HiUserGroup className="mr-2" /> Konfiguruj grupy
          </Link>
          <Link className="btn btn-outline" to="/app/ics">
            <HiCalendar className="mr-2" /> Zarządzaj linkami .ICS
          </Link>
          <Link className="btn btn-outline" to="/app/su/history">
            <HiClipboardList className="mr-2" /> Historia scrapowania
          </Link>
          <button
            className="btn btn-outline hover:btn-warning group"
            onClick={() => navigator.clipboard.writeText(token)}
          >
            <span className="hidden group-hover:block">
              {'N I E B E Z P I E C Z N E'}
            </span>
            <span className="group-hover:hidden">Kopiuj token do schowka</span>
          </button>
        </div>
      </div>
    </div>
  )
}
