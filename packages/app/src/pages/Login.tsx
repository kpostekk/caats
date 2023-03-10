import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LoginGoogle } from '../components/LoginGoogle/LoginGoogle'
import { useAuthStore } from '../states/auth'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  )
  const redirect = params.get('redirect') ?? undefined
  const userAuthenticated = useAuthStore(({ auth }) => !!auth)

  useEffect(() => {
    if (userAuthenticated) {
      setTimeout(() => navigate(redirect ?? '/app'), 3_000)
    }
  }, [userAuthenticated])

  return (
    <div className="h-screen w-screen p-4">
      <div className="mx-auto grid h-full max-w-3xl grid-cols-1 place-content-center">
        <div className="prose">
          <h1>Zaloguj się</h1>
          <p className="text-sm opacity-60">
            Logując się do aplikacji akceptujesz obecną{' '}
            <a
              href="https://github.com/kpostekk/caats/blob/main/PRIVACY.md"
              className="link"
            >
              politykę prywatności
            </a>
            {' oraz '}
            <a
              href="https://github.com/kpostekk/caats/blob/main/TOS.md"
              className="link"
            >
              warunki użytkowania
            </a>
            .
          </p>
          {!userAuthenticated ? (
            <div className="w-72">
              <LoginGoogle redirect={redirect} />
            </div>
          ) : (
            <div className="alert alert-success">
              <div>
                Już jesteś zalogowany! Zaraz zostaniesz przekierowany do
                aplikacji!
              </div>
            </div>
          )}
          <p>
            Przypominamy, że do zalogowania możesz wykorzystać jedynie konto
            studenckie.
          </p>
        </div>
      </div>
    </div>
  )
}
