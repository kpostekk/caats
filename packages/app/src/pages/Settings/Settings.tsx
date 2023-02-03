import { forwardRef, Suspense } from 'react'
import {
  HiBriefcase,
  HiCalendar,
  HiCog,
  HiEyeOff,
  HiKey,
  HiUserGroup,
} from 'react-icons/hi'
import { TbBrandGithub } from 'react-icons/tb'
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
    <div className="h-full py-4">
      <div className="mx-auto grid h-4/5 max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
        <div className="card bg-base-content card-bordered col-span-1 space-y-2 p-4 text-white">
          <SettingsLink to="/app/settings">
            <HiCog />
            Ogólne
          </SettingsLink>
          <hr className="m-2 opacity-40" />
          <SettingsLink to="/app/settings/groups">
            <HiUserGroup /> Grupy
          </SettingsLink>
          <SettingsLink to="/app/settings/ics">
            <HiCalendar /> Subskrypcje ICS
          </SettingsLink>
          <hr className="m-2 opacity-40" />
          <SettingsLink to="/app/settings/safety">
            <HiKey /> Bezpieczeństwo
          </SettingsLink>
          <hr className="m-2 opacity-40" />
          <SettingsLink to="/app/settings/tos">
            <HiBriefcase /> Regulaminy
          </SettingsLink>
          <SettingsLink to="/app/settings/privacy">
            <HiEyeOff /> Prywatność
          </SettingsLink>
          <hr className="m-2 opacity-40" />
          <a
            className="link-hover flex items-center gap-2"
            href="https://github.com/kpostekk/caats"
            target="_blank"
          >
            <TbBrandGithub /> Github
          </a>
          {/* <Link className="link-hover" to="/app/settings/">
            Wgląd
          </Link>
          <Link className="link-hover" to="/app/settings/">
            Konto
          </Link> */}
        </div>
        <div className="card card-bordered p-4 md:col-span-2">
          <Suspense>
          <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
