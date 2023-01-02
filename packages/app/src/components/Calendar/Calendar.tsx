import { DateTime } from 'luxon'
import { useMemo, createContext, useContext } from 'react'

export type CalendarEvent = {
  datetime: DateTime
  title: string
}

const CalendarContext = createContext<CalendarEvent[] | undefined>(undefined)
export const CalendarProvider = CalendarContext.Provider

function useCalendarEvents(date: DateTime) {
  const events = useContext(CalendarContext)
  const filteredEvents = useMemo(
    () =>
      events?.filter(
        (e) =>
          e.datetime >= date.startOf('day') && e.datetime <= date.endOf('day')
      ),
    [events, date]
  )

  return filteredEvents
}

type CalendarDateProps = {
  datetime: DateTime
}

function CalendarDate(props: CalendarDateProps) {
  const events = useCalendarEvents(props.datetime)

  return (
    <div className="space-y-1 p-1">
      <span className="select-none font-extrabold">{props.datetime.day}</span>
      {events?.map((e, i) => (
        <p className="rounded border px-1" key={i}>
          {e.title}
        </p>
      ))}
      {!events?.length && (
        <p className="text-base-300 italic">Brak zajęć tego dnia</p>
      )}
    </div>
  )
}

export type CalendarProps = {
  date: Date
  mode: 'month' | 'week' | 'infinite-scroll'
}

export function Calendar(props: CalendarProps) {
  const datetime = useMemo(() => DateTime.fromJSDate(props.date), [props.date])
  const fistCalDay = useMemo(
    () => datetime.startOf('month').startOf('week'),
    [datetime]
  )

  const calendarSize = useMemo(
    () =>
      datetime.endOf('month').endOf('week').diff(fistCalDay, 'days').days + 1,
    [datetime, fistCalDay]
  )

  const calendarDays = useMemo(
    () =>
      Array.from({ length: calendarSize }, (_, i) =>
        fistCalDay.plus({ days: i })
      ),
    [calendarSize, fistCalDay]
  )

  return (
    <div className="grid h-full w-full grid-cols-7">
      <div className="col-span-7 py-2 text-2xl font-bold">
        {datetime.toFormat('LLLL yyyy')}
      </div>
      {Array.from({ length: 7 }, (_, i) => (
        <div className="py-2" key={i}>
          <span className="font-semibold">
            {fistCalDay.plus({ days: i }).toFormat('EEEE')}
          </span>
        </div>
      ))}
      {calendarDays.map((d, i) => (
        <CalendarDate key={i} datetime={d} />
      ))}
    </div>
  )
}
