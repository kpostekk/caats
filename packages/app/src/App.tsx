import { HiMenu } from 'react-icons/hi'
import { Link, Outlet } from 'react-router-dom'
import { useAuthStore } from './states/auth'

export function App() {
  const picture = useAuthStore(({ auth }) => auth?.user.picture)

  return (
    <div>
      <div className="navbar border-b-base-200 bg-base-100/75 sticky top-0 z-50 mb-2 border-b backdrop-blur-sm">
        <div className="navbar-start">
          <div className="dropdown dropdown-hover">
            <button className="btn btn-ghost">
              <HiMenu />
            </button>
            <ul className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow-xl">
              <li>
                <Link to="/app">Kokpit</Link>
              </li>
              <li>
                <Link to="/app/settings">Ustawienia</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <h1 className="select-none text-3xl font-bold">CaaTS</h1>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end dropdown-hover">
            <button className="btn btn-ghost btn-square aspect-square p-1">
              <img src={picture ?? undefined} />
            </button>
            <ul className="dropdown-content menu bg-base-100 w-52 p-2 shadow-xl">
              <li>
                <Link to="/logout">Wyloguj się</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  )
}
