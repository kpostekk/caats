import { useEffect, useMemo } from 'react'
import { useAuthStore } from './states/auth'
import { Outlet, useNavigate } from 'react-router-dom'

export function Auth() {
  const auth = useAuthStore(({ auth }) => auth)

  const isLoggedIn = useMemo(() => !!auth?.accessToken, [auth?.accessToken])
  const navigate = useNavigate()

  console.log({ auth, isLoggedIn })

  useEffect(() => {
    if (!isLoggedIn) navigate('/login')
  }, [isLoggedIn, navigate])

  if (!isLoggedIn) {
    return null
  }

  return <Outlet />
}
