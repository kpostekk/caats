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

export default function Settings() {
  return (
    <div className="py-4">
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
        <div className="card bg-base-content card-bordered col-span-1 p-4 text-white">
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
        <div className="card card-bordered p-4 md:col-span-2">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
