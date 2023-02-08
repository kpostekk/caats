import { forwardRef, Suspense } from 'react'
import {
  HiBriefcase,
  HiCalendar,
  HiCog,
  HiEyeOff,
  HiKey,
  HiScale,
  HiUserGroup,
} from 'react-icons/hi'
import { TbBrandGithub } from 'react-icons/tb'
import { Link, LinkProps, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../states/auth'

function SettingsLink(props: LinkProps) {
  const isInLocation = false

  if (isInLocation) {
    return <Link {...props} className="link flex items-center gap-2" />
  }

  return <Link {...props} className="link-hover flex items-center gap-2" />
}

export default function Settings() {
  const isSuperuser = useAuthStore(({ auth }) => auth?.user.isSuperuser)

  return (
    <div className="h-full p-4 md:px-0">
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
          <SettingsLink to="/app/settings/privacy">
            <HiEyeOff /> Prywatność
          </SettingsLink>
          {isSuperuser && (
            <SettingsLink to="/app/settings/super">
              <HiScale /> Superuser
            </SettingsLink>
          )}
          <hr className="m-2 opacity-40" />
          <a
            className="link-hover flex items-center gap-2"
            href="https://github.com/kpostekk/caats"
            target="_blank"
          >
            <TbBrandGithub /> Github
          </a>
          <p className="text-right text-sm opacity-20">v{APP_VERSION}</p>
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
