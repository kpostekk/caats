import { DateTime } from 'luxon'
import { useState } from 'react'
import { SearchInput } from '../components/SearchInput/SearchInput'
import { GeneralizedSearchQuery } from '../gql/react-query'

export default function Search() {
  const [data, setData] = useState<GeneralizedSearchQuery>()

  return (
    <div className="container max-w-md space-y-2 py-4">
      <div className="flex justify-center">
        <SearchInput onChange={setData} />
      </div>
      <div className="space-y-2">
        {data
          ? data.findByDescription.map((e, i) => (
              <div key={i} className="space-y-1 py-2">
                <p className="text-sm opacity-70">
                  {DateTime.fromISO(e.startsAt).toLocaleString({
                    dateStyle: 'medium',
                  })}
                </p>
                <a href="#">
                  <p className="link-hover text-3xl font-bold">{e.code}</p>
                </a>
                <p className="text-sm opacity-70">
                  {e.type}
                  {e.room ? ` w sali ${e.room}` : null}
                </p>
                <p>{e.hosts.concat(e.groups).join(', ')}</p>
                <p>
                  {DateTime.fromISO(e.startsAt).toLocaleString({
                    timeStyle: 'short',
                  })}
                  {' - '}
                  {DateTime.fromISO(e.endsAt).toLocaleString({
                    timeStyle: 'short',
                  })}
                </p>
              </div>
              // <div key={i}>
              //   <p>
              //     {DateTime.fromISO(e.startsAt).toLocaleString({
              //       dateStyle: 'medium',
              //     })}
              //   </p>
              //   <p>{e.groups.join(', ')}</p>
              //   <p>{e.hosts.join(', ')}</p>
              //   <ScheduleEvent
              //     start={new Date(e.startsAt)}
              //     end={new Date(e.endsAt)}
              //     {...e}
              //   />
              // </div>
            ))
          : null}
      </div>
    </div>
  )
}
