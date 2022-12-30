import { Link, Outlet } from 'react-router-dom'

export function Settings() {
  return (
    <div>
      <div className="mx-auto grid max-w-4xl grid-cols-3 gap-4">
        <div className="card bg-base-200 card-bordered col-span-1 p-4">
          <Link className="link-hover" to="/app/settings/">
            Ogólne
          </Link>
          <Link className="link-hover" to="/app/settings/groups">
            Grupy
          </Link>
          {/* <Link className="link-hover" to="/app/settings/">
            Wgląd
          </Link>
          <Link className="link-hover" to="/app/settings/">
            Konto
          </Link> */}
        </div>
        <div className="card card-bordered col-span-2 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
