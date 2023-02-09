import { DateTime } from 'luxon'
import { useEffect } from 'react'
import { create } from 'zustand'
import { useUserBusyDaysQuery } from '../../gql/react-query'
import { useGqlClient } from '../useGqlClient/useGqlClient'

type BusyDaysStore = {
  busyDays: Set<string>
  update: (busyDays: Set<string>) => void
  isBusy: (date: string) => boolean
}

const useBusyDaysStore = create<BusyDaysStore>((set, get) => ({
  busyDays: new Set(),
  update: (busyDays) => set({ busyDays }),
  isBusy: (date) => get().busyDays.has(date),
}))

export function useIsBusy() {
  const client = useGqlClient()
  const busyDaysQuery = useUserBusyDaysQuery(client)
  const { isBusy, update, busyDays } = useBusyDaysStore()

  useEffect(() => {
    if (busyDaysQuery.data) {
      const futureSet = new Set<string>(
        busyDaysQuery.data.user.events.map(({ startsAt }) =>
          DateTime.fromISO(startsAt).toISODate()
        )
      )
      update(futureSet)
    }
  }, [busyDaysQuery.data, update])

  return [isBusy, busyDays] as const
}
