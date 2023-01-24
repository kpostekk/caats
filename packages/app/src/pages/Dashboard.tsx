import { useAuthStore } from '../states/auth'
import { useNextEventsDashQuery } from '../gql/react-query'
import { DateTime } from 'luxon'
import { Link } from 'react-router-dom'
import { HiCalendar, HiUserGroup } from 'react-icons/hi'
import { SiGraphql } from 'react-icons/si'
import { useGqlClient } from '../components/useGqlClient/useGqlClient'
import { useState } from 'react'
import { UpdatePrompt } from '../components/UpdatePrompt/UpdatePrompt'
import { ScheduleEvent } from '../components/ScheduleEvent/ScheduleEvent'

export default function Dashboard() {
  // const token = useAuthStore(({ auth }) => auth?.accessToken)
  const name = useAuthStore(({ auth }) => auth?.user.name)
  const client = useGqlClient()
  const [now] = useState(DateTime.now())
  const events = useNextEventsDashQuery(client, {
    now: now.minus({ minutes: 25 }).toISO(),
    deadline: now.endOf('day').toISO(),
  })

  return (
    <div className="container max-w-5xl pb-12 md:pb-0">
      <div className="grid grid-cols-1 gap-2 xl:grid-cols-3">
        <div className="col-span-2">
          <div className="flex items-center">
            <h1 className="w-2/3 px-2 text-[36pt] font-extrabold">
              Siema, {name?.split(' ')[0]}!
            </h1>
          </div>
          <div className="rounded-xl bg-black p-2 text-white">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
              <UpdatePrompt />
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
              <span className="text-center text-[9pt] text-white opacity-50 md:col-span-3">
                v{APP_VERSION}
              </span>
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
              room={e.room}
            />
          ))}
          {events.data?.getScheduleUser.length === 0 ? (
            <p className="text-center italic opacity-70">
              Nie ma więcej zajęć na dziś! 🎉
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
