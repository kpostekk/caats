import { useEffect, useMemo } from 'react'
import { useAuthStore } from './states/auth'
import { Outlet, useNavigate } from 'react-router-dom'
import { useUserProfileQuery } from './gql/react-query'
import { useGqlClient } from './components'

export function Auth() {
  const client = useGqlClient()
  const userQuery = useUserProfileQuery(client, {}, { enabled: false })
  const auth = useAuthStore(({ auth }) => auth)
  const updateProfile = useAuthStore((state) => state.updateProfile)

  const isLoggedIn = useMemo(() => !!auth?.accessToken, [auth?.accessToken])
  const navigate = useNavigate()

  useEffect(() => {
    if (!userQuery.data?.user) return
    updateProfile(userQuery.data.user)
  }, [userQuery.data])

  useEffect(() => {
    if (!isLoggedIn) navigate('/login')
  }, [isLoggedIn, navigate])

  if (!isLoggedIn) {
    return null
  }

  userQuery.refetch()

  return <Outlet />
}
