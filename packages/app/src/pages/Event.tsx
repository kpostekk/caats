import { ReactNode } from 'react'
import { HiChevronDown } from 'react-icons/hi'
import { useParams } from 'react-router-dom'
import { useGqlClient } from '../components'
import { useEventDetailsQuery } from '../gql/react-query'

type DataRowProps = {
  value: [string, ReactNode]
}

function DataRow(props: DataRowProps) {
  return (
    <>
      <span className="place-self-start font-bold">{props.value[0]}</span>
      <span className="place-self-stretch text-right">{props.value[1]}</span>
    </>
  )
}

function DataRowContainer(props: { children: ReactNode | ReactNode[] }) {
  return (
    <div className="grid grid-cols-2 place-content-between gap-2">
      {props.children}
    </div>
  )
}

export default function Event() {
  const { id } = useParams()
  if (!id) return null

  const client = useGqlClient()
  const query = useEventDetailsQuery(client, { id })

  if (!query.data || !query.data.getEvent) return null

  const event = query.data.getEvent

  return (
    <div className="container max-w-lg p-2 md:px-0">
      <h1 className="text-5xl font-bold">
        {event.code} <span className="text-lg">{`(#${event.id})`}</span>
      </h1>
      <p>{event.subject}</p>
      <div className="space-y-4 py-2">
        <h2 className="text-3xl font-bold">Informacje ogólne</h2>
        <DataRowContainer>
          <DataRow value={['Typ', event.type]} />
          <DataRow
            value={[
              'Sala',
              event.room ? (
                event.room
              ) : (
                <span className="italic">Nie przypisano sali</span>
              ),
            ]}
          />
          <DataRow
            value={[
              'Prowadzący',
              event.hosts.length > 0 ? (
                event.hosts.join(', ')
              ) : (
                <span className="italic">Nie przypisano prowadzących</span>
              ),
            ]}
          />
          <DataRow
            value={[
              'Grupy',
              event.groups.length > 0 ? (
                event.groups.join(', ')
              ) : (
                <span className="italic">Nie przypisano grup</span>
              ),
            ]}
          />
          <DataRow
            value={[
              'Data',
              new Date(event.startsAt).toLocaleDateString(undefined, {
                dateStyle: 'full',
              }),
            ]}
          />
          <DataRow
            value={[
              'Czas rozpoczęcia',
              new Date(event.startsAt).toLocaleTimeString(undefined, {
                timeStyle: 'short',
              }),
            ]}
          />
          <DataRow
            value={[
              'Czas zakończenia',
              new Date(event.endsAt).toLocaleTimeString(undefined, {
                timeStyle: 'short',
              }),
            ]}
          />
        </DataRowContainer>
        <h2 className="text-3xl font-bold">Źródło</h2>
        <DataRowContainer>
          <DataRow value={['Identyfikator', event.source.id]} />
          <DataRow value={['Sygnatura', event.source.constantId]} />
          <DataRow
            value={[
              'Przetworzono',
              new Date(event.source.createdAt).toLocaleString(),
            ]}
          />
          <div className="col-span-2">
            <div
              tabIndex={0}
              className="rounded-box collapse border-2 border-black"
            >
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                <HiChevronDown className="mr-2 inline" />
                Zapisane dane
              </div>
              <div className="collapse-content space-y-2">
                {Object.entries<{ value: string; humanKey: string }>(
                  event.source.object
                ).map(([key, { value, humanKey }]) => (
                  <div key={key}>
                    <p className="text-xs italic opacity-70">({key})</p>
                    <p>
                      <span className="font-bold">{humanKey}</span> {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DataRowContainer>
        <h2 className="text-3xl font-bold">Pochodzenie</h2>
        <DataRowContainer>
          {event.source.task?.worker ? (
            <>
              <DataRow value={['Scraper', event.source.task.worker.alias]} />
              <DataRow
                value={[
                  'Ostatnio widziany',
                  new Date(event.source.task.worker.lastSeen).toLocaleString(),
                ]}
              />
            </>
          ) : null}
          <DataRow value={['Identyfikator', event.source.task.id]} />
          <DataRow
            value={[
              'Sygnatura początkowa strony źródłowej',
              event.source.task.initialHash,
            ]}
          />
          <DataRow
            value={[
              'Sygnatura wynikowa strony źródłowej',
              event.source.task.initialHash,
            ]}
          />
          <DataRow
            value={[
              'Zaplanowano',
              new Date(event.source.task.createdAt).toLocaleString(),
            ]}
          />
          <DataRow
            value={[
              'Wykonano',
              new Date(event.source.task.finishedAt).toLocaleString(),
            ]}
          />
        </DataRowContainer>
      </div>
    </div>
  )
}
