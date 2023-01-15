import { useMemo } from 'react'

export type ScheduleEvent = {
  code: string
  subject: string
  start: Date
  end: Date
  room: string
  focused?: boolean
}

export function ScheduleEvent(props: ScheduleEvent) {
  const startString = useMemo(
    () => props.start.toLocaleString(undefined, { timeStyle: 'short' }),
    [props.start]
  )
  const endString = useMemo(
    () => props.end.toLocaleString(undefined, { timeStyle: 'short' }),
    [props.end]
  )

  return (
    <div
      className={
        props.focused
          ? 'select-none rounded-lg border-2 border-black bg-black p-2 text-white'
          : 'select-none rounded-lg border-2 border-black p-2'
      }
    >
      <h2 className="text-[21pt] font-bold">{props.code}</h2>
      <p className="text-[10pt]">{props.subject}</p>
      <div className="flex items-center gap-2 text-[12pt] font-semibold">
        <span>
          {startString} - {endString}
        </span>
        <div
          className={
            props.focused
              ? 'h-6 border-r-[1px] border-white'
              : 'h-6 border-r-[1px] border-black'
          }
        />
        <span>{props.room}</span>
      </div>
    </div>
  )
}
