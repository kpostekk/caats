import create from 'zustand'
import { persist } from 'zustand/middleware'

export type SettingsStore = {
  preferredTheme?: 'dark' | 'light'
  update: (newSettings: Partial<SettingsStore>) => void
}

export const useSettings = create<SettingsStore>()(
  persist(
    (set, get) => ({
      update: (newSettings) => set({ ...get(), ...newSettings }),
    }),
    {
      name: 'settings',
    }
  )
)
