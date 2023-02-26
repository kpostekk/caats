import { DateTime } from 'luxon'
import { Fragment, useMemo, useState } from 'react'
import { useGqlClient } from '../components'
import {
  SimpleEventFragment,
  useUserEventsAfterQuery,
} from '../gql/react-query'

type ScheduleCardProps = {
  event: SimpleEventFragment
}

function ScheduleCard(props: ScheduleCardProps) {
  const ev = props.event
  const start = useMemo(() => DateTime.fromISO(ev.startsAt), [ev.startsAt])
  const end = useMemo(() => DateTime.fromISO(ev.endsAt), [ev.endsAt])

  return (
    <div className="card card-compact card-bordered">
      <div className="card-body">
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold">{ev.code}</span>
          <span>{ev.type}</span>
          <div className="grow" />
          <span className="text-right">{ev.subject}</span>
        </div>
        <span className="text-lg font-bold">
          {start.toLocaleString(DateTime.TIME_24_SIMPLE)}
          {' - '}
          {end.toLocaleString(DateTime.TIME_24_SIMPLE)}
        </span>
        <div className="flex items-end gap-1">
          <span>{ev.room}</span>
          <div className="grow" />
          <span className="text-right">{ev.hosts.join(', ')}</span>
        </div>
      </div>
    </div>
  )
}

export default function Schedule() {
  const client = useGqlClient()
  const [now] = useState(DateTime.now().startOf('day'))
  const allEventsSinceNow = useUserEventsAfterQuery(client, {
    since: now.toISO(),
  })

  return (
    <div className="container max-w-3xl space-y-2 py-2">
      {allEventsSinceNow.data ? (
        allEventsSinceNow.data.user.events.map((ev, i) => {
          const prevDate =
            allEventsSinceNow.data.user.events[i - 1]?.startsAt.split('T')[0]
          const currentDate = ev.startsAt.split('T')[0]

          const appendDivider =
            prevDate === undefined || prevDate !== currentDate

          // console.log({ prevDate, currentDate, appendDivider })

          return (
            <Fragment key={i}>
              {appendDivider && (
                <p
                  className="pt-4 pl-1 text-2xl font-extrabold"
                  key={i + 'div'}
                >
                  {DateTime.fromISO(currentDate).toFormat('EEEE, dd MMMM')}
                </p>
              )}
              <ScheduleCard key={i + 'sc'} event={ev} />
            </Fragment>
          )
        })
      ) : (
        <>
          <div className="bg-base-200 h-10 w-72 animate-pulse rounded" />
          <div className="bg-base-200 h-32 animate-pulse rounded" />
          <div className="bg-base-200 h-32 animate-pulse rounded" />
          <div className="bg-base-200 h-32 animate-pulse rounded" />
          <div className="bg-base-200 h-32 animate-pulse rounded" />
          <div className="bg-base-200 h-10 w-72 animate-pulse rounded" />
          <div className="bg-base-200 h-32 animate-pulse rounded" />
          <div className="bg-base-200 h-32 animate-pulse rounded" />
          <div className="bg-base-200 h-32 animate-pulse rounded" />
        </>
      )}
    </div>
  )
}
