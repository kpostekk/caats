import { DateTime } from 'luxon'
import { useCallback, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { SearchInput } from '../components/SearchInput/SearchInput'
import { ScheduleEvent } from '../gql/react-query'
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

function Examples(props: { value: string }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const handler = useCallback(() => {
    setSearchParams({ q: props.value })
  }, [props.value])

  return <li className='hover:underline underline-offset-1 cursor-pointer' onClick={handler}>{props.value}</li>
}

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [data, setData] = useState<GeneralizedSearchQuery>()

  const displayInfo = useMemo(() => {
    if (data) return false

    const now = new Date()
    const expireAt = new Date('2024-01-01T00:00:00.000Z')

    return now < expireAt
  }, [data])

  return (
    <div className="container max-w-md space-y-2 p-2 md:px-0">
      {displayInfo && (
        <>
          <p className="text-info border-y-info my-2 border-y-2 py-2 font-bold">
            Silnik wyszukiwarki został przerobiony. Take a try {';)'}
          </p>
          <p className="opacity-80 font-bold">Oto przykładowe zapytania: </p>
          <ul className="text-sm ml-4">
            {/* <li>BYT Czwartek</li>
            <li>ZSK 15:45</li>
            <li>Pierzchała Środa</li>
            <li>GRK Ćwiczenia Czwartek</li> */}
            <Examples value="BYT Czwartek" />
            <Examples value="ZSK 15:45" />
            <Examples value="Pierzchała Środa" />
            <Examples value="GRK Ćwiczenia Czwartek" />
          </ul>
        </>
      )}
      <div className="flex justify-center">
        <SearchInput
          value={searchParams.get('q') ?? ''}
          onResults={setData}
          onChange={(v) => {
            setSearchParams({ q: v })
          }}
        />
      </div>
      <div className="divide-y-2">
        {data
          ? data.findByDescription.map((e, i) => (
              <SearchResult key={i + '_sr'} event={e} />
            ))
          : null}
      </div>
    </div>
  )
}
