import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LoginGoogle } from '../components/LoginGoogle/LoginGoogle'
import { useAuthStore } from '../states/auth'

export default function Logout() {
  const logout = useAuthStore(({ logout }) => logout)

  useEffect(() => logout(), [logout])

  return (
    <div className="h-screen w-screen p-4">
      <div className="mx-auto grid h-full max-w-3xl grid-cols-1 place-content-center">
        <div className="prose">
          <h1>Zostałeś wylogowany!</h1>
          <h2>Możesz się wciąż zalogować ponownie</h2>
          <div className="w-72">
            <LoginGoogle />
          </div>
          <div className="mt-2 w-72">
            <Link className="btn" to="/">
              powrót do strony głównej
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
