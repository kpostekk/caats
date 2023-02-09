import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { LoginMutation } from '../gql/graphql'

export type AuthStore = {
  auth?: LoginMutation['authGoogle']
  update: (response: LoginMutation['authGoogle']) => void
  updateProfile: (profile: LoginMutation['authGoogle']['user']) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      update: (response) => set({ auth: response }),
      updateProfile: (profile) =>
        set({ auth: { user: profile, accessToken: get().auth?.accessToken } }),
      logout: () => set({ auth: undefined }),
    }),
    {
      name: 'auth',
    }
  )
)
