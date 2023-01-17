import {
  HiAdjustments,
  HiCalendar,
  HiLogout,
  HiMenu,
  HiTemplate,
} from 'react-icons/hi'
import { Link, Outlet } from 'react-router-dom'
import { useAuthStore } from '../states/auth'

export default function App() {
  const picture = useAuthStore(({ auth }) => auth?.user.picture)

  return (
    <div>
      <div className="navbar border-b-base-200 bg-base-100/75 sticky top-0 z-50 border-b backdrop-blur-sm">
        <div className="navbar-start">
          <div className="dropdown dropdown-hover">
            <button className="btn btn-outline">
              <HiMenu />
            </button>
            <ul className="dropdown-content menu bg-base-100 rounded-box w-44 p-2 shadow-xl">
              <li>
                <Link to="/app">
                  <HiTemplate /> Kokpit
                </Link>
              </li>
              <li>
                <Link to="/app/calendar">
                  <HiCalendar /> Kalendarz
                </Link>
              </li>
              <li>
                <Link to="/app/settings">
                  <HiAdjustments />
                  Ustawienia
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <h1 className="select-none text-2xl font-bold">CaaTS</h1>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end dropdown-hover">
            <button className="btn btn-outline btn-square aspect-square rounded-lg">
              <img className="rounded-md" src={picture ?? undefined} />
            </button>
            <ul className="dropdown-content menu bg-base-100 w-44 p-1 shadow-xl">
              <li>
                <Link to="/logout/">
                  <HiLogout /> Wyloguj się
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="relative h-[calc(100vh-4rem-6px)]">
        <Outlet />
      </div>
    </div>
  )
}
