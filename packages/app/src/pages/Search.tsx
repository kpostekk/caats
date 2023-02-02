import { DateTime } from 'luxon'
import { useMemo, useState } from 'react'
import { useDebounce } from 'react-use'
import { useGqlClient } from '../components'
import { ScheduleEvent } from '../components/ScheduleEvent/ScheduleEvent'
import { useGeneralizedSearchQuery } from '../gql/react-query'

export default function Search() {
  const [inputVal, setInputVal] = useState('')
  const client = useGqlClient()
  const query = useGeneralizedSearchQuery(
    client,
    { input: inputVal },
    { enabled: false }
  )

  const [debounced] = useDebounce(
    () => {
      if (inputVal.length < 3) return
      query.refetch()
    },
    1_000,
    [inputVal]
  )
  const isDebouncing = useMemo(() => !debounced(), [inputVal, query.isFetching])

  return (
    <div className="container space-y-2 py-4">
      <div className="flex justify-center">
        <input
          className="input mx-auto w-1/2 border-2 border-black shadow"
          placeholder={`przykładowo: "asd bayer ćwiczenia", "skj smyk wykład", "tomaszewski"`}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
      </div>
      {isDebouncing ? <p>Keep typing...</p> : null}
      {query.isFetching ? <p>Pobieram...</p> : null}
      {query.data ? (
        query.data.findByDescription.length === 0 ? (
          <p>Brak danych!</p>
        ) : null
      ) : null}
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-2">
        {query.data
          ? query.data.findByDescription.map((e, i) => (
              <div key={i}>
                <p>
                  {DateTime.fromISO(e.startsAt).toLocaleString({
                    dateStyle: 'medium',
                  })}
                </p>
                <p>{e.groups.join(', ')}</p>
                <p>{e.hosts.join(', ')}</p>
                <ScheduleEvent
                  start={new Date(e.startsAt)}
                  end={new Date(e.endsAt)}
                  {...e}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  )
}
