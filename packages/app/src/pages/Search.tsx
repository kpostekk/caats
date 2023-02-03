import { DateTime } from 'luxon'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SearchInput } from '../components/SearchInput/SearchInput'
import { ScheduleEvent } from '../gql/graphql'
import { GeneralizedSearchQuery } from '../gql/react-query'

type ScheduleEventProps = {
  event: Pick<
    ScheduleEvent,
    'startsAt' | 'endsAt' | 'type' | 'groups' | 'hosts' | 'room' | 'code' | 'id'
  >
}

function SearchResult({ event: e }: ScheduleEventProps) {
  return (
    <div className="space-y-1 py-2">
      <p className="text-sm opacity-70">
        {DateTime.fromISO(e.startsAt).toLocaleString({
          dateStyle: 'medium',
        })}
      </p>
      <Link to={`/app/event/${e.id}`}>
        <p className="link-hover text-4xl font-bold">
          {e.code} <span className="text-sm font-semibold">{`(#${e.id})`}</span>
        </p>
      </Link>
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
  )
}

export default function Search() {
  const [data, setData] = useState<GeneralizedSearchQuery>()

  return (
    <div className="container max-w-md space-y-2 p-2 md:px-0">
      <div className="flex justify-center">
        <SearchInput onChange={setData} />
      </div>
      <div className="space-y-2">
        {data
          ? data.findByDescription.map((e, i) => (
              <SearchResult key={i + '_sr'} event={e} />
            ))
          : null}
      </div>
    </div>
  )
}
