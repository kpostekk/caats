import { useAuthStore } from '../states/auth'
import { useNextEventsDashQuery } from '../gql/react-query'
import { DateTime, Duration } from 'luxon'
import { Link } from 'react-router-dom'
import { HiCalendar, HiClipboardList, HiUserGroup } from 'react-icons/hi'
import { SiGraphql } from 'react-icons/si'
import { useGqlClient } from '../components/useGqlClient/useGqlClient'
import { useEffect, useMemo, useState } from 'react'
import { Greeting } from '../components/Greeting/Greeting'
import { useEffectOnce, useHarmonicIntervalFn } from 'react-use'
import { UpdatePrompt } from '../components/UpdatePrompt/UpdatePrompt'
import { ScheduleEvent } from '../components/ScheduleEvent/ScheduleEvent'

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}

function useCountdown(targetDateTime?: DateTime) {
  const [now, setNow] = useState<Duration | undefined>()

  useHarmonicIntervalFn(
    () =>
      setNow(
        targetDateTime
          ?.diffNow()
          .shiftTo('hours', 'minutes', 'seconds', 'milliseconds')
      ),
    200
  )

  return now || Duration.fromMillis(0)
}

export default function Dashboard() {
  // const token = useAuthStore(({ auth }) => auth?.accessToken)
  const client = useGqlClient()
  const [now] = useState(DateTime.now())
  const events = useNextEventsDashQuery(client, {
    now: now.toISO(),
  })

  const cNow = useCountdown(
    events.data?.getScheduleUser[0]
      ? DateTime.fromISO(events.data?.getScheduleUser[0].startsAt)
      : undefined
  )

  return (
    <div className="container max-w-5xl">
      <UpdatePrompt />
      <div className="grid grid-cols-1 gap-2 xl:grid-cols-3">
        <div className="col-span-2">
          <div className="flex items-center">
            <h1 className="w-2/3 px-2 text-[36pt] font-extrabold">
              Siema, student!
            </h1>
          </div>
          <div className="rounded-xl bg-black p-2 text-white">
            <div className="space-y-2">
              <Link to="/app/calendar" className="btn btn-link text-white">
                <HiCalendar className="mr-2" /> Kalendarz
              </Link>
              <a className="btn btn-link text-white" href="/graphiql">
                <SiGraphql className="mr-2" /> GraphiQL
              </a>
              <Link
                className="btn btn-link text-white"
                to="/app/settings/groups"
              >
                <HiUserGroup className="mr-2" /> Konfiguruj grupy
              </Link>

              {/* <Link className="btn btn-link text-white" to="/app/ics">
                <HiCalendar className="mr-2" /> Zarządzaj linkami .ICS
              </Link>
              <Link className="btn btn-link text-white" to="/app/su/history">
                <HiClipboardList className="mr-2" /> Historia scrapowania
              </Link> */}
            </div>
          </div>
        </div>
        <div className="col-span-1 space-y-2 px-2">
          <h2 className="text-[22pt] font-semibold">Najbliższe zajęcia</h2>
          <hr />
          {events.data?.getScheduleUser.map((e, i) => (
            <ScheduleEvent
              key={i}
              {...e}
              start={new Date(e.startsAt)}
              end={new Date(e.endsAt)}
              focused={
                new Date(e.startsAt) <= new Date() &&
                new Date(e.endsAt) > new Date()
              }
              room={e.room ?? 'TBA'}
            />
          ))}
        </div>
      </div>

      {/* <div className="grid grid-cols-1 gap-4 md:col-span-3 md:grid-cols-3">
        <div className="card card-bordered md:col-span-2">
          <div className="card-body prose">
            <h2>
              <Greeting />
            </h2>
            <div>
              <h3>Do kolejnych zajęć pozostało</h3>
              <div className="grid auto-cols-max grid-flow-col gap-5 text-center">
                <div className="flex flex-col">
                  <span className="countdown font-mono text-5xl">
                    <span style={{ '--value': cNow.hours }}></span>
                  </span>
                  hours
                </div>
                <div className="flex flex-col">
                  <span className="countdown font-mono text-5xl">
                    <span style={{ '--value': cNow.minutes }}></span>
                  </span>
                  min
                </div>
                <div className="flex flex-col">
                  <span className="countdown font-mono text-5xl">
                    <span style={{ '--value': cNow.seconds }}></span>
                  </span>
                  sec
                </div>
              </div>
            </div>
            <Link
              className="btn btn-outline mt-auto max-w-fit"
              to="/app/calendar"
            >
              Kalendarz
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
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
      </div>
      <div className="card card-bordered md:col-span-3">
        <div className="card-body grid grid-cols-1 md:grid-cols-4">
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
        </div>
      </div> */}
    </div>
  )
}
