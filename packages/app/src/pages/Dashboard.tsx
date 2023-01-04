import { useAuthStore } from '../states/auth'
import { useNextEventsDashQuery } from '../gql/react-query'
import { DateTime } from 'luxon'
import { Link } from 'react-router-dom'
import { HiCalendar, HiClipboardList, HiUserGroup } from 'react-icons/hi'
import { SiGraphql } from 'react-icons/si'
import { useGqlClient } from '../components/useGqlClient/useGqlClient'
import { useMemo, useState } from 'react'

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

export default function Dashboard() {
  const token = useAuthStore(({ auth }) => auth?.accessToken)
  const client = useGqlClient()
  const [now] = useState(DateTime.now())
  const events = useNextEventsDashQuery(client, {
    now: now.toISO(),
  })

  return (
    <div className="mx-auto grid max-w-6xl gap-4 py-4 md:grid-cols-3">
      <div className="grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2">
        <div className="card card-bordered md:col-span-2">
          <div className="card-body prose">
            <h2>
              <Greeting />
            </h2>
          </div>
        </div>
        {events.data ? (
          events.data.getScheduleUser.map((ev, i) => (
            <div className="card card-bordered card-compact" key={i}>
              <div className="card-body">
                <p className="text-xl font-bold">{ev.code}</p>
                <p>
                  {ev.type} w {ev.room}
                </p>
                <p>
                  {DateTime.fromISO(ev.startsAt).toFormat(
                    'HH:mm, EEEE dd MMMM'
                  )}
                </p>
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
            <SiGraphql className="mr-2" /> GraphiQL
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
