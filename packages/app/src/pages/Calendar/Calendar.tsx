import { DateTime } from 'luxon'
import { useCallback, useState } from 'react'
import { HiArrowLeft, HiArrowRight, HiReply } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { CalDatePicker } from '../../components/CalDatePicker/CalDatePicker'

export default function Calendar() {
  //const client = useGqlClient()
  //const rq = useAllRangeQuery(client)
  const [now, setNow] = useState(new Date())
  const addMonth = useCallback(
    (amount: number) => {
      setNow(DateTime.fromJSDate(now).plus({ months: amount }).toJSDate())
    },
    [setNow, now]
  )

  const navigate = useNavigate()

  return (
    <div className="mx-auto p-2 md:max-w-md md:px-0">
      <CalDatePicker
        date={now}
        onClick={(d) =>
          navigate(`/app/calendar/${DateTime.fromJSDate(d).toISODate()}`)
        }
      />
      <div className="grid grid-cols-3 gap-8 py-2 px-8">
        <button onClick={() => addMonth(-1)} className="btn btn-outline">
          <HiArrowLeft />
        </button>
        <button onClick={() => setNow(new Date())} className="btn btn-outline">
          <HiReply />
        </button>
        <button onClick={() => addMonth(1)} className="btn btn-outline">
          <HiArrowRight />
        </button>
      </div>
    </div>
  )
}
