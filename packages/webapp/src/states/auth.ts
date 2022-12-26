import create from 'zustand'
import { persist } from 'zustand/middleware'
import { LoginMutation } from '../gql/graphql'

export type AuthStore = {
  auth?: LoginMutation['authGoogle']
  update: (response: LoginMutation['authGoogle']) => void
}

export const useAuthStore = create<AuthStore>()(
  persist((set) => ({ update: (response) => set({ auth: response }) }), {
    name: 'auth',
  })
)
