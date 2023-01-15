import { DateTime } from 'luxon'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMap } from 'react-use'
import { useGqlClient } from '../../components'
import { CalDatePicker } from '../../components/CalDatePicker/CalDatePicker'
import { useAllRangeQuery } from '../../gql/react-query'

export default function Calendar() {
  //const client = useGqlClient()
  //const rq = useAllRangeQuery(client)
  const [now] = useState(new Date())

  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-sm p-2">
      <CalDatePicker
        date={now}
        onClick={(d) =>
          navigate(`/app/calendar/${DateTime.fromJSDate(d).toISODate()}`)
        }
      />
    </div>
  )
}
