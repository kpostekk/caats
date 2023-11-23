import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ScheduleEvent } from '../../gql/react-query'

export type ScheduleEventProps = {
  event: Pick<
    ScheduleEvent,
    'code' | 'startsAt' | 'endsAt' | 'subject' | 'room' | 'type'
  > & { id?: string }
  focused?: boolean
}

export function ScheduleEventRow(props: ScheduleEventProps) {
  const startString = useMemo(
    () =>
      new Date(props.event.startsAt).toLocaleString(undefined, {
        timeStyle: 'short',
      }),
    [props.event.startsAt]
  )
  const endString = useMemo(
    () =>
      new Date(props.event.endsAt).toLocaleString(undefined, {
        timeStyle: 'short',
      }),
    [props.event.endsAt]
  )

  return (
    <div
      className={
        props.focused
          ? 'select-none space-y-1 rounded-lg border-2 border-black bg-black p-2 text-white'
          : 'select-none space-y-1 rounded-lg border-2 border-black p-2'
      }
    >
      {props.event.id ? (
        <Link to={`/app/event/${props.event.id}`}>
          <h2 className="link-hover text-[24pt] font-bold">
            {props.event.code}
          </h2>
        </Link>
      ) : (
        <h2 className="text-[21pt] font-bold">{props.event.code}</h2>
      )}
      {/* <p className="text-[10pt]">{props.subject}</p> */}
      <div className="flex items-center gap-2 text-[12pt] font-semibold">
        <span>
          {startString} - {endString}
        </span>
        {!!props.event.room && (
          <>
            <div
              className={
                props.focused
                  ? 'h-6 border-r-[1px] border-white'
                  : 'h-6 border-r-[1px] border-black'
              }
            />
            <span>{props.event.room}</span>
          </>
        )}
        <>
          <div
            className={
              props.focused
                ? 'h-6 border-r-[1px] border-white'
                : 'h-6 border-r-[1px] border-black'
            }
          />
          <span>{props.event.type}</span>
        </>
      </div>
    </div>
  )
}
