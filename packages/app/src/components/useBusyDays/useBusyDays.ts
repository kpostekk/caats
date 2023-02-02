import { DateTime } from 'luxon'
import { useEffect } from 'react'
import { create } from 'zustand'
import { useBusyDaysQuery } from '../../gql/react-query'
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
  const busyDays = useBusyDaysQuery(client)
  const { isBusy, update } = useBusyDaysStore()

  useEffect(() => {
    if (busyDays.data) {
      const futureSet = new Set<string>(
        busyDays.data.getScheduleUser.map(({ startsAt }) =>
          DateTime.fromISO(startsAt).toISODate()
        )
      )
      update(futureSet)
    }
  }, [busyDays.data, update])

  return isBusy
}
