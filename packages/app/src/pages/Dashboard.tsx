import { useAuthStore } from '../states/auth'
import {
  SimpleEventFragment,
  UserQuery,
  useUserQuery,
} from '../gql/react-query'
import { useGqlClient } from '../components/useGqlClient/useGqlClient'
import palmLeafs from '../assets/palm-leafs.webp'
import { UpdatePrompt } from '../components/UpdatePrompt/UpdatePrompt'
import { HiCalendar, HiCog, HiExternalLink, HiSearch } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { DateTime } from 'luxon'
import { AnimatedCountdown } from '../components/AnimatedCountdown/AnimatedCountdown'
import { useMemo } from 'react'

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

function useIsVacation(query?: UserQuery) {
  const isVacation = useMemo(() => {
    if (!query?.user.nextEvent) return false // if there is no next event return false (probably loading)
    if (query.user.currentEvent) return false // if there is current event return false (that means you are not on vacation)
    if (
      DateTime.fromISO(query.user.nextEvent?.startsAt).diffNow().as('days') < 4
    ) {
      return false
    }

    if (!query.user.nextEvent?.previous) return true // if there is no previous event return true (that means next will be first event)

    const diff = DateTime.fromISO(query.user.nextEvent?.startsAt).diff(
      DateTime.fromISO(query.user.nextEvent?.previous?.endsAt),
      'days'
    )
    return diff.as('days') > 7 && diff.isValid
  }, [
    query?.user.nextEvent,
    query?.user.currentEvent,
    query?.user.nextEvent?.previous,
  ])
  return isVacation
}

function PrimarySectionVacation(props: PrimarySectionProps) {
  if (!props.query || !props.query.user.nextEvent) return null

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold">
        <Link
          className="link link-hover"
          to={`/app/calendar/${DateTime.fromISO(
            props.query.user.nextEvent.startsAt
          ).toISODate()}`}
        >
          {'Wracasz na uczelnię za '}
          {DateTime.fromISO(props.query.user.nextEvent.startsAt)
            .startOf('day')
            .diffNow()
            .shiftTo('days', 'hours')
            .normalize()
            .toHuman({ unitDisplay: 'short', maximumFractionDigits: 0 })}
        </Link>
      </h2>
      <p className="italic">Now relax, you deserve it. That's an order.</p>
    </div>
  )
}

function PrimarySectionCurrentEvent(props: PrimarySectionProps) {
  if (!props.query || !props.query.user.currentEvent) return null

  return (
    <div className="space-y-2">
      <h1 className="text-4xl font-bold">Obecne zajęcia</h1>
      <PrimarySectionEvent simpleEvent={props.query.user.currentEvent} />
      <p>Pozostało</p>
      <AnimatedCountdown
        target={new Date(props.query.user.currentEvent.endsAt)}
      />
    </div>
  )
}

function PrimarySectionNextEvent(props: PrimarySectionProps) {
  if (!props.query || !props.query.user.nextEvent) return null

  return (
    <div className="space-y-2">
      <h1 className="text-4xl font-bold">Kolejne zajęcia</h1>
      <PrimarySectionEvent simpleEvent={props.query.user.nextEvent} />
    </div>
  )
}

function PrimarySection(props: PrimarySectionProps) {
  const isVacation = useIsVacation(props.query)

  if (!props.query) return null

  if (isVacation) {
    return <PrimarySectionVacation {...props} />
  }

  if (props.query.user.currentEvent) {
    return <PrimarySectionCurrentEvent {...props} />
  }

  if (props.query.user.nextEvent) {
    return <PrimarySectionNextEvent {...props} />
  }

  return (
    <div className="space-y-2">
      <h1 className="text-4xl font-bold">Brak zajęć w terminarzu</h1>
      <p>Możliwe, że potrzeba zaktualizować przypisane grupy.</p>
    </div>
  )
}

function DashboardButtons() {
  return (
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
  )
}

export default function Dashboard() {
  // const token = useAuthStore(({ auth }) => auth?.accessToken)
  const name = useAuthStore(({ auth }) => auth?.user.name)
  const client = useGqlClient()
  const userQuery = useUserQuery(client)

  return (
    <div className="container max-w-5xl pb-12 md:pb-0">
      {/* Mobile variant */}
      <div className="grid grid-cols-1 gap-2 md:hidden">
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
          <div className="mx-1 h-[30vh] min-h-[310px] rounded-xl bg-black p-6 text-white">
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
        <DashboardButtons />
      </div>
      {/* Desktop variant */}
      <div className="my-2 hidden grid-cols-2 gap-2 md:grid">
        <div className="relative row-span-2 w-full select-none overflow-hidden rounded-lg border-2 border-black">
          <img
            className="absolute right-0 z-0 h-[160%] translate-x-[50%] translate-y-[-12%] rotate-[-60deg] scale-[100%]"
            src={palmLeafs}
          />
          <div className="absolute z-20 grid h-full place-items-center p-4">
            <h1 className="mr-auto rounded-lg bg-white/60 p-2 pl-0 text-4xl font-bold backdrop-blur-sm">
              Siema, {name?.split(' ')[0]}
            </h1>
          </div>
        </div>
        <div className="w-full rounded-lg bg-black p-4 text-white">
          <UpdatePrompt />
          <PrimarySection query={userQuery.data} />
        </div>
        <div className="w-full rounded-lg border-2 border-black p-4">
          <DashboardButtons />
        </div>
      </div>
    </div>
  )
}
