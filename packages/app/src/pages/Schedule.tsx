import { DateTime } from 'luxon'
import { useMemo, useState } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { useGqlClient } from '../components'
import {
  Calendar,
  CalendarEvent,
  CalendarProvider,
} from '../components/Calendar/Calendar'
import { useNextEventsCalQuery } from '../gql/react-query'

export default function Schedule() {
  const client = useGqlClient()
  const [now] = useState(DateTime.now())
  const scheduleEvents = useNextEventsCalQuery(client, {
    start: now.startOf('month').startOf('week'),
    end: now.endOf('month').endOf('week'),
  })

  const nextEventsCal: CalendarEvent[] | undefined = useMemo(
    () =>
      scheduleEvents.data?.getScheduleUser.map((e) => ({
        datetime: DateTime.fromISO(e.startsAt),
        title: `${e.code} - ${e.type}`,
      })),
    [scheduleEvents.data]
  )

  return (
    <div className="h-full">
      <div className="flex">{'<- date ->'}</div>
      <div className="grid h-full grid-cols-7"></div>
      {/* <CalendarProvider value={nextEventsCal}>
        <div className="flex h-full items-center">
          <div className="flex w-12 grow justify-end px-4">
            <button className="btn btn-outline btn-circle">
              <HiChevronLeft />
            </button>
          </div>
          <div className="h-full overflow-auto">
            <Calendar date={now.toJSDate()} mode={'month'} />
          </div>
          <div className="w-12 grow px-4">
            <button className="btn btn-outline btn-circle">
              <HiChevronRight />
            </button>
          </div>
        </div>
      </CalendarProvider> */}
    </div>
  )
}
