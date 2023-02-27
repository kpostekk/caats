import { DateTime } from 'luxon'
import { HiArrowLeft, HiArrowRight, HiCalendar } from 'react-icons/hi'
import { Link, useParams } from 'react-router-dom'
import { useGqlClient } from '../../components'
import { ScheduleEventRow } from '../../components/ScheduleEvent/ScheduleEvent'
import { useUserEventsQuery } from '../../gql/react-query'

export default function CalendarDay() {
  const { date } = useParams()
  const dt = DateTime.fromISO(date!)

  const client = useGqlClient()
  const events = useUserEventsQuery(client, {
    since: dt.toISO(),
    until: dt.plus({ days: 1 }).toISO(),
  })

  return (
    <>
      {events.data ? (
        <div className="container flex min-h-full max-w-sm flex-col gap-2 p-2">
          <h1 className="py-1 text-[20pt] font-bold">
            {dt.toFormat('cccc, d LLLL')}
          </h1>
          {events.data.user.events.length === 0 ? (
            <p className="select-none italic opacity-80">
              Brak zajęć tego dnia 🎉
            </p>
          ) : null}
          {events.data.user.events.map((e, i) => {
            return (
              <ScheduleEventRow
                key={i}
                event={e}
                focused={
                  new Date(e.startsAt) <= new Date() &&
                  new Date(e.endsAt) > new Date()
                }
              />
            )
          })}
          <div className="min-h-[100px] grow" />
        </div>
      ) : (
        <div className="container max-w-sm space-y-2 p-2">
          <h1 className="py-1 text-[20pt] font-bold">
            {dt.toFormat('cccc, d LLLL')}
          </h1>
          <div className="bg-base-300 h-[85px] animate-pulse rounded-lg" />
          <div className="bg-base-300 h-[85px] animate-pulse rounded-lg" />
        </div>
      )}

      <div className="fixed bottom-0 z-50 w-full py-4">
        <div className="card card-bordered card-compact z-10 mx-auto w-fit bg-white">
          <div className="card-body grid grid-cols-3 gap-4">
            <Link
              to={`/app/calendar/${dt.minus({ day: 1 }).toISODate()}`}
              className="btn"
            >
              <HiArrowLeft />
            </Link>
            <Link to="/app/calendar" className="btn">
              <HiCalendar />
            </Link>
            <Link
              to={`/app/calendar/${dt.plus({ day: 1 }).toISODate()}`}
              className="btn"
            >
              <HiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
