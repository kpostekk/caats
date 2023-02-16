import { DateTime, Duration } from 'luxon'
import { useMemo } from 'react'
import { ScheduleEvent, SimpleEventFragment } from '../../gql/graphql'

export type TimelineLegends = {
  beginDate: Date
  endDate: Date
  scale: number
}

function TimelineLegends(props: TimelineLegends) {
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
          className="flex w-full gap-1"
        >
          <span className="text-xs opacity-80">
            {v.toLocaleString({ timeStyle: 'short' })}
          </span>
          <hr className="grow" />
        </div>
      ))}
      <div style={{ height: 1000 * 60 * 30 * props.scale }} />
    </>
  )
}

export type TimelineEventProps = {
  startsAt: Date
  endsAt: Date
  title: string
  relativeTo: Date
  scale: number
}

function TimelineEvent(props: TimelineEventProps) {
  return (
    <div
      className="absolute z-20 ml-12 w-24 rounded border border-blue-500 bg-white"
      style={{
        top:
          (props.startsAt.getTime() - props.relativeTo.getTime()) * props.scale,
        height:
          (props.endsAt.getTime() - props.startsAt.getTime()) * props.scale,
      }}
      key={props.startsAt.getTime()}
    >
      {props.title}
    </div>
  )
}

export type TimelineProps = {
  events: SimpleEventFragment[]
}

export function Timeline(props: TimelineProps) {
  const scale = 1 / (1000 * 60 * 1.1) // one pixel (as unit) equals 66 seconds

  const beginDate = useMemo(
    () =>
      new Date(
        props.events
          .map((e) => e.startsAt)
          .reduce((pv, cv) => new Date(Math.min(pv.getTime(), cv.getTime())))
          .getTime() -
          1000 * 60 * 30
      ),
    [props.events]
  )
  const endDate = useMemo(
    () =>
      new Date(
        props.events
          .map((e) => e.endsAt)
          .reduce((pv, cv) => new Date(Math.max(pv.getTime(), cv.getTime())))
          .getTime() +
          1000 * 60 * 30
      ),
    [props.events]
  )

  return (
    <div
      style={{
        height: (endDate.getTime() - beginDate.getTime()) * scale,
      }}
      className="relative w-1/3 border border-red-600"
    >
      <div className="absolute w-full">
        <TimelineLegends
          beginDate={beginDate}
          endDate={endDate}
          scale={scale}
        />
      </div>
      {props.events.map((event) => (
        <TimelineEvent
          key={event.startsAt.getTime()}
          scale={scale}
          relativeTo={beginDate}
          title={event.code}
          startsAt={new Date(event.startsAt)}
          endsAt={new Date(event.endsAt)}
        />
      ))}
    </div>
  )
}
