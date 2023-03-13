import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { SimpleEventFragment } from '../../gql/graphql'
import { TimelineEvent } from './TimelineEvent'
import { TimelineLegends } from './TimelineLegens'

export type TimelineProps = {
  targetDate: Date
  events: SimpleEventFragment[]
  scale: number
}

export function Timeline(props: TimelineProps) {
  const scale = 1 / (1000 * 60 * props.scale) // one pixel (as unit) equals 66 seconds

  const beginDate = useMemo(
    () =>
      DateTime.fromJSDate(props.targetDate)
        .set({
          hour: 7,
          minute: 30,
          second: 0,
          millisecond: 0,
        })
        .toJSDate(),
    [props.events]
  )
  const endDate = useMemo(
    () =>
      DateTime.fromJSDate(props.targetDate)
        .set({
          hour: 22,
          minute: 0,
          second: 0,
          millisecond: 0,
        })
        .toJSDate(),
    [props.events]
  )

  return (
    <div
      style={{
        height: (endDate.getTime() - beginDate.getTime()) * scale,
      }}
      className="relative min-w-[290px] grow"
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
          key={new Date(event.startsAt).getTime()}
          scale={scale}
          relativeTo={beginDate}
          code={event.code}
          startsAt={new Date(event.startsAt)}
          endsAt={new Date(event.endsAt)}
          room={event.room}
          type={event.type}
          id={event.id}
        />
      ))}
    </div>
  )
}
