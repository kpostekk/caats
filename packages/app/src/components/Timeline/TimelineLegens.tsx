import { DateTime, Duration } from 'luxon'
import { useMemo } from 'react'

export type TimelineLegends = {
  beginDate: Date
  endDate: Date
  scale: number
}

export function TimelineLegends(props: TimelineLegends) {
  const linesAt = useMemo(() => {
    let length = Duration.fromMillis(
      props.endDate.getTime() - props.beginDate.getTime()
    ).as('hours')
    length = Math.floor(length)

    return Array.from({ length }).map((_, i) => {
      return DateTime.fromJSDate(props.beginDate)
        .endOf('hour')
        .plus({ millisecond: 1, hours: i })
    })
  }, [props])

  return (
    <>
      <div style={{ height: 1000 * 60 * 30 * props.scale }} />
      {linesAt.map((v) => (
        <div
          style={{ height: 1000 * 60 * 60 * props.scale }}
          key={v.toUnixInteger()}
          className="w-full"
        >
          <div className="flex w-full items-center gap-1">
            <span className="select-none text-xs opacity-80">
              {v.toLocaleString({ timeStyle: 'short' })}
            </span>
            <hr className="grow" />
          </div>
        </div>
      ))}
      <div style={{ height: 1000 * 60 * 30 * props.scale }} />
    </>
  )
}
