import { DateTime } from 'luxon'
import { useCallback } from 'react'
import { HiArrowLeft, HiArrowRight, HiCalendar } from 'react-icons/hi'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGqlClient } from '../../components'
import { ScheduleEvent } from '../../components/ScheduleEvent/ScheduleEvent'
import { useAllEventsSinceQuery, useInRangeQuery } from '../../gql/react-query'
import { motion, AnimatePresence } from 'framer-motion'

export default function CalendarDay() {
  const { date } = useParams()
  const dt = DateTime.fromISO(date!)
  const navigate = useNavigate()

  const client = useGqlClient()
  const events = useInRangeQuery(client, {
    start: dt.toISO(),
    end: dt.plus({ days: 1 }).toISO(),
  })

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
  }

  return (
    <>
      <AnimatePresence initial={true}>
        <motion.div
          key={date}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.4}
          onDragEnd={() =>
            navigate(`/app/calendar/${dt.plus({ day: 1 }).toISODate()}`)
          }
        >
          {events.data ? (
            <div className="container flex min-h-full max-w-sm flex-col gap-2 p-2">
              <h1 className="py-1 text-[20pt] font-bold">
                {dt.toFormat('cccc, d LLLL')}
              </h1>
              {events.data.getScheduleUser.length === 0 ? (
                <p className="select-none italic opacity-80">
                  Brak zajęć tego dnia 🎉
                </p>
              ) : (
                <>
                  {events.data.getScheduleUser.map((e, i) => {
                    return (
                      <ScheduleEvent
                        key={i}
                        code={e.code}
                        subject={e.subject}
                        start={new Date(e.startsAt)}
                        end={new Date(e.endsAt)}
                        focused={
                          new Date(e.startsAt) <= new Date() &&
                          new Date(e.endsAt) > new Date()
                        }
                        room={e.room}
                        type={e.type}
                      />
                    )
                  })}
                </>
              )}

              <div className="min-h-[100px] grow" />
            </div>
          ) : (
            <div className="container max-w-sm space-y-2 p-2">
              <h1 className="py-1 text-[20pt] font-bold">
                {dt.toFormat('cccc, d LLLL')}
              </h1>
              <div className="bg-base-300 h-[85px] animate-pulse rounded-lg" />
              <div className="bg-base-300 h-[85px] animate-pulse rounded-lg" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="fixed bottom-0 w-full py-4">
        <div className="card card-bordered card-compact z-10 mx-auto w-fit bg-white">
          <div className="card-body grid grid-cols-3 gap-4">
            <Link
              to={`/app/calendar/${dt.minus({ day: 1 }).toISODate()}`}
              className="btn"
            >
              <HiArrowLeft />
            </Link>
            <Link to="/app/calendar" className="btn">
              <HiCalendar />
            </Link>
            <Link
              to={`/app/calendar/${dt.plus({ day: 1 }).toISODate()}`}
              className="btn"
            >
              <HiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
