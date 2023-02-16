import { DateTime, Duration } from 'luxon'
import { useEffect, useMemo, useState } from 'react'
import { useMap } from 'react-use'
import { SimpleEventFragment } from '../../gql/graphql'
import { useUserEventsQuery } from '../../gql/react-query'
import { useGqlClient } from '../useGqlClient/useGqlClient'

function usePartitionedEvents<
  T extends Pick<SimpleEventFragment, 'startsAt' | 'endsAt'>
>(beginDate: Date, endDate: Date, events: T[]) {
  const [eventMap, { set, get }] = useMap<Record<string, T[]>>()

  const eventDates = useMemo(() => {
    const length = Math.ceil(
      Duration.fromMillis(endDate.getTime() - beginDate.getTime()).as('days')
    )

    const eventDates = Array.from({ length }).map((_, i) =>
      DateTime.fromJSDate(beginDate).plus({ days: i }).toISODate()
    )

    return eventDates
  }, [beginDate.getTime(), endDate.getTime()])

  useEffect(() => {
    for (const ed of eventDates) {
      set(ed, [])
    }

    for (const event of events) {
      const eDate = DateTime.fromISO(event.startsAt).toISODate()
      console.log(eDate, [...get(eDate), event])
      set(eDate, [...get(eDate), event])
    }
  }, [eventDates, events])

  return eventMap
}

export function Timelines() {
  const [now] = useState(new Date())

  const [since, until] = useMemo(() => {
    const nowDt = DateTime.fromJSDate(now)
    return [
      nowDt.startOf('day'),
      nowDt.startOf('day').plus({ days: 71 }).endOf('day'),
    ] as const
  }, [])

  const client = useGqlClient()
  const userEventsQuery = useUserEventsQuery(client, {
    since: since.toISO(),
    until: until.toISO(),
  })

  const a = usePartitionedEvents(
    since.toJSDate(),
    until.toJSDate(),
    userEventsQuery.data?.user.events ?? []
  )

  return <pre>{JSON.stringify(a, undefined, 2)}</pre>
}
