import { useAuthStore } from '../states/auth'
import {
  SimpleEventFragment,
  UserQuery,
  useUserQuery,
} from '../gql/react-query'
import { useGqlClient } from '../components/useGqlClient/useGqlClient'
import palmLeafs from '../assets/palm-leafs.png'
import { UpdatePrompt } from '../components/UpdatePrompt/UpdatePrompt'
import { HiCalendar, HiCog, HiExternalLink, HiSearch } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { DateTime } from 'luxon'

type PrimarySectionEventProps = {
  simpleEvent: SimpleEventFragment
}

function PrimarySectionEvent({ simpleEvent }: PrimarySectionEventProps) {
  return (
    <>
      <h3 className="text-2xl font-semibold">
        {simpleEvent.code}{' '}
        <span className="text-xl font-medium">
          {simpleEvent.type}, {simpleEvent.room}
        </span>
      </h3>
      <p className="text-lg">
        {new Date(simpleEvent.startsAt).toLocaleDateString(undefined, {
          dateStyle: 'full',
        })}
        {', '}
        {new Date(simpleEvent.startsAt).toLocaleTimeString(undefined, {
          timeStyle: 'short',
        })}
        {' - '}
        {new Date(simpleEvent.endsAt).toLocaleTimeString(undefined, {
          timeStyle: 'short',
        })}
      </p>
      <p className="py-4 opacity-80">
        <Link
          to={`/app/calendar/${DateTime.fromISO(
            simpleEvent.startsAt
          ).toISODate()}`}
          className="link link-hover"
        >
          <HiExternalLink className="mr-2 inline" />
          Cały plan na ten dzień
        </Link>
      </p>
    </>
  )
}

type PrimarySectionProps = {
  query?: UserQuery
}

function PrimarySection(props: PrimarySectionProps) {
  if (!props.query) return null

  if (props.query.user.currentEvent) {
    return (
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Obecne zajęcia</h1>
        <PrimarySectionEvent simpleEvent={props.query.user.currentEvent} />
      </div>
    )
  } else if (props.query.user.nextEvent) {
    return (
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Kolejne zajęcia</h1>
        <PrimarySectionEvent simpleEvent={props.query.user.nextEvent} />
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <h1 className="text-4xl font-bold">Brak zajęć w terminarzu</h1>
      <p>Możliwe, że potrzeba zaktualizować przypisane grupy.</p>
    </div>
  )
}

export default function Dashboard() {
  // const token = useAuthStore(({ auth }) => auth?.accessToken)
  const name = useAuthStore(({ auth }) => auth?.user.name)
  const client = useGqlClient()
  const userQuery = useUserQuery(client)

  return (
    <div className="container max-w-5xl pb-12 md:pb-0">
      <div className="grid grid-cols-1 gap-2 xl:grid-cols-3">
        <div className="col-span-2">
          <div className="relative select-none overflow-hidden">
            <div className="absolute right-0">
              <img
                style={{
                  height: '260px',
                  transform:
                    'translate(41px, -53px) rotate(-51deg) scaleX(-100%)',
                }}
                src={palmLeafs}
              />
            </div>
            <div className="flex items-center p-4">
              <h1 className="w-2/3 px-2 text-[32pt] font-bold">
                Siema, {name?.split(' ')[0]}!
              </h1>
            </div>
          </div>
          <div className="mx-1 min-h-[30vh] rounded-xl bg-black p-6 text-white">
            <UpdatePrompt />
            {userQuery.isLoading ? (
              <div className="space-y-4">
                <div className="h-12 w-full animate-pulse rounded bg-white/20" />
                <div className="h-6 w-full animate-pulse rounded bg-white/20" />
                <div className="h-4 w-full animate-pulse rounded bg-white/20" />
              </div>
            ) : (
              <PrimarySection query={userQuery.data} />
            )}
          </div>
        </div>
        <div className="col-span-1 grid grid-cols-1 content-start space-y-2 px-6 py-2 md:px-0">
          <Link to="/app/calendar" className="btn btn-outline">
            <HiCalendar className="mr-2" /> Kalendarz
          </Link>
          <Link to="/app/search" className="btn btn-outline">
            <HiSearch className="mr-2" />
            Wyszukiwarka
          </Link>
          <Link to="/app/settings" className="btn btn-outline">
            <HiCog className="mr-2" /> Ustawienia
          </Link>
        </div>
      </div>
    </div>
  )
}
