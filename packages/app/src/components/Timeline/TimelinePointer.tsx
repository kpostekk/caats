import { DateTime } from 'luxon'
import { useState } from 'react'
import { useInterval } from 'react-use'

interface TimelinePointerProps {
  beginDate: Date
  endDate: Date
  scale: number
}

export const TimelinePointer = ({
  beginDate,
  endDate,
  scale,
}: TimelinePointerProps) => {
  const [now, setNow] = useState(DateTime.now())
  useInterval(() => setNow(DateTime.now()), 1000)
  return (
    <>
      {DateTime.fromJSDate(beginDate) < now &&
        now < DateTime.fromJSDate(endDate) && (
          <div
            className="absolute flex w-[calc(100%+0.25rem)] items-center transition-all"
            style={{
              top:
                scale *
                now.diff(DateTime.fromJSDate(beginDate)).as('milliseconds'),
              left: '-0.25rem',
            }}
          >
            <span className="select-none rounded-lg bg-red-600 px-1 text-xs text-white">
              {now.toLocaleString({ timeStyle: 'short' })}
            </span>
            <hr className="w-full rounded-e-lg border-2 border-red-600" />
          </div>
        )}
    </>
  )
}
