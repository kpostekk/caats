import { useAuthStore } from '../states/auth'
import {
  useAllEventsSinceQuery,
  useNextEventQuery,
  useNextEventsDashQuery,
  useUserGroupsQuery,
} from '../gql/react-query'
import { DateTime } from 'luxon'
import { useGqlClient } from '../components/useGqlClient/useGqlClient'
import { useMemo, useState } from 'react'
import { ScheduleEventRow } from '../components/ScheduleEvent/ScheduleEvent'
import palmLeafs from '../assets/palm-leafs.png'
import { UpdatePrompt } from '../components/UpdatePrompt/UpdatePrompt'

function CurrentStatus() {
  const client = useGqlClient()

}

export default function Dashboard() {
  // const token = useAuthStore(({ auth }) => auth?.accessToken)
  const name = useAuthStore(({ auth }) => auth?.user.name)
  const client = useGqlClient()
  const [now, setNow] = useState(DateTime.now())

  //const initalNow = useMemo(() => now, [])
  //useInterval(() => setNow(DateTime.now()), 1000)

  const events = useNextEventsDashQuery(client, {
    now: now.minus({ minutes: 25 }).toISO(),
    deadline: now.endOf('day').toISO(),
  })
  const nextEventQuery = useNextEventQuery(client, { now: now.toISO() })

  const nextEvent = useMemo(() => {
    if (!nextEventQuery.data?.getScheduleUser) return null
    if (nextEventQuery.data.getScheduleUser.length !== 1) return null
    return nextEventQuery.data.getScheduleUser[0]
  }, [nextEventQuery.data?.getScheduleUser])

  const groups = useUserGroupsQuery(client)

  return (
    <div className="container max-w-5xl pb-12 md:pb-0">
      <div className="grid grid-cols-1 gap-2 xl:grid-cols-3">
        <div className="col-span-2">
          <div className="relative overflow-hidden">
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
          <div className="min-h-[30vh] rounded-xl bg-black p-6 text-white">
            <UpdatePrompt />
          </div>
        </div>
        <div className="col-span-1 space-y-2 px-6 py-2 md:px-0">
          <h2 className="text-[22pt] font-semibold">Najbliższe zajęcia</h2>
          <hr />
          {events.data?.getScheduleUser.map((e, i) => (
            <ScheduleEventRow
              key={i}
              event={e}
              focused={
                new Date(e.startsAt) <= new Date() &&
                new Date(e.endsAt) > new Date()
              }
            />
          ))}
          {events.data?.getScheduleUser.length === 0 ? (
            <p className="text-center italic opacity-70">
              Nie ma więcej zajęć na dziś! 🎉
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
