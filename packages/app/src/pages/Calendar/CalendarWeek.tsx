import { DateTime } from 'luxon'
import { HiArrowLeft, HiArrowRight, HiCalendar } from 'react-icons/hi'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { Timelines } from '../../components/Timelines/Timelines'

export default function CalendarWeek() {
  const params = useParams()
  const [searchParams] = useSearchParams({
    width: '7',
    offset: '0',
  })
  const dt = DateTime.fromISO(params.date!)
    .startOf('week')
    .plus({ days: Number(searchParams.get('offset')) })

  return (
    <>
      <div className="container min-h-full overflow-x-auto py-2">
        <Timelines
          count={Number(searchParams.get('width'))}
          scale={0.925}
          date={dt.toJSDate()}
        />
      </div>
      <div className="fixed bottom-0 w-full py-4">
        <div className="card card-bordered card-compact z-10 mx-auto w-fit bg-white">
          <div className="card-body grid grid-cols-3 gap-4">
            <Link
              to={`/app/calendar/${dt.minus({ week: 1 }).toISODate()}/week`}
              className="btn"
            >
              <HiArrowLeft />
            </Link>
            <Link to="/app/calendar" className="btn">
              <HiCalendar />
            </Link>
            <Link
              to={`/app/calendar/${dt.plus({ week: 1 }).toISODate()}/week`}
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
