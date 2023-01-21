import { DateTime, Duration } from 'luxon'
import { useEffect, useMemo, useState } from 'react'
import { useInRangeQuery } from '../../gql/react-query'
import { useGqlClient } from '../useGqlClient/useGqlClient'

export type CalDatePickerProps = {
  date: Date
  busy?: boolean[]
  onClick?: (date: Date) => void
}

function useCalendarDates(date: Date) {
  const [datetime, setDatetime] = useState(
    DateTime.fromJSDate(date, { zone: 'UTC' })
  )

  useEffect(() => {
    setDatetime(DateTime.fromJSDate(date, { zone: 'utc' }))
  }, [date])

  return {
    begin: datetime.startOf('month'),
    end: datetime.endOf('month'),
    length:
      datetime
        .endOf('month')
        .diff(datetime.startOf('month'))
        .normalize()
        .as('days') + 1,
    title: datetime.toFormat('LLLL yyyy'),
    offset: datetime
      .startOf('month')
      .diff(datetime.startOf('month').startOf('week'))
      .normalize()
      .as('days'),
  }
}

type RenderDayProps = {
  date: DateTime
  current: boolean
  onClick?: (...args: unknown[]) => void
}

function CalDate(props: RenderDayProps) {
  const client = useGqlClient()
  const { data } = useInRangeQuery(client, {
    start: props.date.startOf('day').toISO(),
    end: props.date.endOf('day').toISO(),
  })

  const busy = useMemo(() => !!data?.getScheduleUser.length, [data])

  return (
    <div
      onClick={() => props.onClick?.()}
      className="grid h-16 cursor-pointer select-none grid-cols-1 justify-items-center gap-1 py-1 hover:opacity-75"
    >
      <div>
        {props.current ? (
          <span className="rounded bg-black p-2 text-white">
            {props.date.day}
          </span>
        ) : (
          <span>{props.date.day}</span>
        )}
      </div>
      {busy ? (
        <div className="bg-base-content h-2 w-2 rounded-full opacity-10" />
      ) : null}
    </div>
  )
}

export function CalDatePicker(props: CalDatePickerProps) {
  const { begin, title, offset, length } = useCalendarDates(props.date)

  return (
    <>
      <h2 className="text-[18pt] font-semibold">{title}</h2>
      <div className="grid min-h-[10px] grid-cols-7 border-y py-2">
        {Array.from({ length: offset }).map((_, i) => (
          <div key={i} />
        ))}
        {Array.from({ length }).map((_, i) => (
          <CalDate
            date={begin.plus({ days: i })}
            current={
              begin.plus({ days: i }).diffNow() >=
                Duration.fromObject({ day: 1 }) &&
              begin.plus({ days: i }).diffNow() <
                Duration.fromObject({ day: 1 })
            }
            key={i}
            onClick={() =>
              props.onClick?.(begin.plus({ days: i }).startOf('day').toJSDate())
            }
          />
        ))}
      </div>
    </>
  )
}
