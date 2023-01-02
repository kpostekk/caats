import { Link, useLocation } from 'react-router-dom'

export default function NotFound() {
  const { pathname } = useLocation()

  return (
    <div className="grid h-screen w-screen grid-cols-1 place-content-center place-items-center">
      <div className="prose">
        <h1>4 0 4</h1>
        <h2>
          Ścieżka <code>{pathname}</code> nie istnieje!
        </h2>
        <div className="flex gap-4">
          <Link className="btn" to="/">
            Powrót do strony głównej
          </Link>
          <Link className="btn" to="/login">
            Zaloguj się
          </Link>
        </div>
      </div>
    </div>
  )
}
