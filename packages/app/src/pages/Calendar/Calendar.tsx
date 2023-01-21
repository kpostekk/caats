import { DateTime } from 'luxon'
import { useCallback, useState } from 'react'
import { HiArrowLeft, HiArrowRight, HiRefresh, HiReply } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { useMap } from 'react-use'
import { useGqlClient } from '../../components'
import { CalDatePicker } from '../../components/CalDatePicker/CalDatePicker'
import { useAllRangeQuery } from '../../gql/react-query'

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
    <div className="mx-auto max-w-sm md:max-w-md">
      <CalDatePicker
        date={now}
        onClick={(d) =>
          navigate(`/app/calendar/${DateTime.fromJSDate(d).toISODate()}`)
        }
      />
      <div className="grid grid-cols-3 gap-2 py-2">
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
