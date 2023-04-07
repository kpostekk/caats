import { Transition } from '@headlessui/react'
import { ReactNode, Suspense } from 'react'
import {
  HiAdjustments,
  HiCalendar,
  HiLogout,
  HiMenu,
  HiPrinter,
  HiSearch,
  HiStatusOffline,
  HiTemplate,
} from 'react-icons/hi'
import { IconType } from 'react-icons/lib/esm'
import { Link, Outlet } from 'react-router-dom'
import { useNetworkState } from 'react-use'
import { useAuthStore } from '../states/auth'

type RenderableLink = {
  label: string
  icon?: IconType
  to: string
}

type RenderLinksProps = {
  links: RenderableLink[]
  renderAs?: (link: RenderableLink, renderedLink: ReactNode) => ReactNode
}

function RenderLinks(props: RenderLinksProps) {
  return (
    <>
      {props.links.map((link) => {
        const renderedLink = (
          <Link to={link.to} key={link.to}>
            {link.icon && <link.icon />}
            {link.label}
          </Link>
        )
        return props.renderAs
          ? props.renderAs(link, renderedLink)
          : renderedLink
      })}
    </>
  )
}

const links = [
  {
    label: 'Kokpit',
    icon: HiTemplate,
    to: '/app',
  },
  {
    label: 'Kalendarz',
    icon: HiCalendar,
    to: '/app/calendar',
  },
  {
    label: 'Wyszukiwarka',
    icon: HiSearch,
    to: '/app/search',
  },
  {
    label: 'Ustawienia',
    icon: HiAdjustments,
    to: '/app/settings',
  },
]

export default function App() {
  const picture = useAuthStore(({ auth }) => auth?.user.picture)
  const isSuperuser = useAuthStore(({ auth }) => auth?.user.isSuperuser)
  const who = useAuthStore(({ auth }) => auth?.user.name)
  const networkState = useNetworkState()

  return (
    <div>
      <div className="navbar sticky top-0 z-50 bg-black text-white">
        <div className="navbar-start">
          <div className="dropdown dropdown-hover">
            <button className="btn btn-ghost">
              <HiMenu />
            </button>
            <ul className="dropdown-content menu bg-base-100 rounded-box space-y-1 p-2 text-black shadow-xl">
              {isSuperuser && (
                <>
                  <li>
                    <Link to="/app/status">
                      <HiPrinter />
                      Stan botów
                    </Link>
                  </li>
                  <hr />
                </>
              )}
              <RenderLinks
                links={links}
                renderAs={(l, r) => <li key={l.to}>{r}</li>}
              />
            </ul>
          </div>
        </div>
        <Link className="navbar-center gap-2" to={'/app'}>
          <Transition
            show={!networkState.online}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="animate-pulse text-2xl">
              <HiStatusOffline />
            </div>
          </Transition>
          <img className="h-6" src="/grumpyicon.webp" />
          <h1 className="select-none text-2xl font-bold">CaaTS</h1>
        </Link>
        <div className="navbar-end">
          <div className="dropdown dropdown-end dropdown-hover">
            <button className="btn btn-ghost btn-square aspect-square rounded-lg">
              <img className="w-8 rounded-md" src={picture ?? undefined} />
            </button>
            <ul className="dropdown-content menu bg-base-100 rounded-box w-44 space-y-1 p-2 text-black shadow-xl">
              <li className="select-none px-4 py-1 opacity-50">{who}</li>
              <hr />
              <li>
                <Link to="/logout/">
                  <HiLogout /> Wyloguj się
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="relative h-[calc(100vh-4rem-8px)]">
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}
