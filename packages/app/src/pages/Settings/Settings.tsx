import { forwardRef } from 'react'
import { HiCog, HiUserGroup } from 'react-icons/hi'
import { Link, LinkProps, Outlet, useLocation } from 'react-router-dom'

function SettingsLink(props: LinkProps) {
  const isInLocation = false

  if (isInLocation) {
    return <Link {...props} className="link flex items-center gap-2" />
  }

  return <Link {...props} className="link-hover flex items-center gap-2" />
}

export function Settings() {
  return (
    <div>
      <div className="mx-auto grid max-w-4xl grid-cols-3 gap-4">
        <div className="card bg-base-200 card-bordered col-span-1 p-4">
          <SettingsLink to="/app/settings">
            <HiCog />
            Ogólne
          </SettingsLink>

          <SettingsLink to="/app/settings/groups">
            <HiUserGroup /> Grupy
          </SettingsLink>
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
