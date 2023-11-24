import { DateTime, Duration } from 'luxon'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUpdate } from 'react-use'
import { SimpleEventFragment } from '../../gql/react-query'
import { useUserEventsQuery } from '../../gql/react-query'
import { Timeline } from '../Timeline/Timeline'
import { useGqlClient } from '../useGqlClient/useGqlClient'

function usePartitionedEvents<
  T extends Pick<SimpleEventFragment, 'startsAt' | 'endsAt'>
>(beginDate: Date, endDate: Date, events: T[]) {
  const update = useUpdate()
  const [evMap, setEvMap] = useState(new Map<string, T[]>())

  const set = useCallback(
    (k: string, v: T[]) => {
      evMap.set(k, v)
      update()
    },
    [evMap]
  )
  const get = useCallback(
    (k: string) => {
      return evMap.get(k) ?? []
    },
    [evMap]
  )

  // const [eventMap, { set, get }] = useMap<Record<string, T[]>>()

  const eventDates = useMemo(() => {
    const length = Math.ceil(
      Duration.fromMillis(endDate.getTime() - beginDate.getTime()).as('days')
    )

    const eventDates = Array.from({ length }).map((_, i) =>
      DateTime.fromJSDate(beginDate).plus({ days: i }).toISODate()
    )

    return eventDates
  }, [beginDate.getTime(), endDate.getTime(), events])

  useEffect(() => {
    evMap.clear()
    for (const ed of eventDates) {
      set(ed!, [])
    }

    for (const event of events) {
      const eDate = DateTime.fromISO(event.startsAt).toISODate()!
      console.log(eDate, [...get(eDate), event])
      set(eDate, [...get(eDate), event])
    }
    update()
  }, [eventDates, events])

  return Object.fromEntries(evMap.entries())
}

export type TimelinesProps = {
  scale: number
  count: number
  date?: Date
}

export function Timelines(props: TimelinesProps) {
  const [now, setNow] = useState(props.date ?? new Date())

  useEffect(() => {
    if (props.date) setNow(props.date)
  }, [props.date?.getDate()])

  const [since, until] = useMemo(() => {
    const nowDt = DateTime.fromJSDate(now)
    return [
      nowDt.startOf('day'),
      nowDt
        .startOf('day')
        .plus({ days: props.count - 1 })
        .endOf('day'),
    ] as const
  }, [props.date?.getDate()])

  const client = useGqlClient()
  const userEventsQuery = useUserEventsQuery(client, {
    since: since.toISO()!,
    until: until.toISO()!,
  })

  const a = usePartitionedEvents(
    since.toJSDate(),
    until.toJSDate(),
    userEventsQuery.data?.user.events ?? []
  )

  return (
    <div className="flex gap-4">
      {Object.entries(a).map(([k, v], i) => {
        const dt = DateTime.fromISO(k)
        return (
          <div key={i + '-' + k} className="grow basis-0">
            <Link className="link-hover" to={`/app/calendar/${k}`}>
              <h2 className="text-2xl font-bold">{dt.toFormat('EEEE')}</h2>
              <h3>{dt.toLocaleString({ dateStyle: 'short' })}</h3>
            </Link>
            <Timeline events={v} targetDate={new Date(k)} scale={props.scale} />
          </div>
        )
      })}
    </div>
  )
}
