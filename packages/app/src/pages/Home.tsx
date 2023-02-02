import { lazy, Suspense } from 'react'
import {
  FaArrowDown,
  FaBookOpen,
  FaDiscord,
  FaGhost,
  FaGithub,
} from 'react-icons/fa'
import {
  HiExternalLink,
  HiEyeOff,
  HiLightBulb,
  HiLightningBolt,
  HiPuzzle,
} from 'react-icons/hi'
import { LoginGoogle } from '../components/LoginGoogle/LoginGoogle'
import { UpdatePrompt } from '../components/UpdatePrompt/UpdatePrompt'

const AppVersion = lazy(() => import('../components/AppVersion'))

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <div className="grid h-screen w-full place-content-center place-items-center gap-4 px-8 sm:grid-cols-1 md:grid-cols-2 md:p-24 md:px-0 lg:p-64">
        <div>
          <h1 className="select-none text-6xl font-extrabold">CaaTS</h1>
          <p className="my-2 text-xl font-semibold">
            Cats as a Timetable Service
          </p>
          <Suspense>
            <AppVersion />
            <UpdatePrompt />
          </Suspense>
          <p className="pb-2 italic opacity-40">
            <HiPuzzle className="inline" /> this is prerelease, work in progress
          </p>
          <p>
            <HiEyeOff className="inline" /> private by design, no cookies, no
            analytics or tracking
          </p>
          <p>
            <HiLightningBolt className="inline" /> fast by choice, modern tech
            stack
          </p>
          <p>
            <HiLightBulb className="inline" /> made by enthusiasts, available
            for everyone
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <LoginGoogle />
          <a
            href="https://github.com/kpostekk/caats/blob/main/README.md"
            className="btn btn-outline"
          >
            <HiExternalLink className="mr-2" />
            Dowiedz się więcej
          </a>
        </div>
      </div>
      <footer className="border-t-base-200 border-t px-6 py-12">
        <div className="flex w-full select-none flex-wrap justify-center gap-12">
          <div className="prose prose-p:my-1">
            <p>
              <a href="https://github.com/kpostekk/caats">
                <FaGithub className="mr-2 inline-block" />
                github
              </a>
            </p>
            <p>
              <a href="https://github.com/kpostekk/caats/blob/main/PRIVACY.md">
                <FaGhost className="mr-2 inline-block" />
                polityka prywatności
              </a>
            </p>
            <p>
              <a href="https://github.com/kpostekk/caats/blob/main/TOS.md">
                <FaBookOpen className="mr-2 inline-block" />
                warunki użytkowania
              </a>
            </p>
          </div>
          <div className="prose prose-p:my-1">
            <p>
              <a href="#">
                <FaDiscord className="mr-2 inline-block" />
                discord
              </a>
            </p>
          </div>
          <div className="max-w-md space-y-2 text-sm opacity-40">
            <p>
              Coded and designed by{' '}
              <a className="link" href="https://github.com/aleksandra-indulska">
                Krystian Postek
              </a>
              .
            </p>
            <p>
              Thanks to{' '}
              <a className="link" href="https://github.com/aleksandra-indulska">
                Aleksandra Indulska
              </a>{' '}
              for scraper performance improvements, security advisories and
              project consulting.
            </p>
            <p>
              Thanks to{' '}
              <a className="link" href="https://github.com/rafalopilowski1">
                Rafał Opiłowski
              </a>{' '}
              for his contribution to Altapi, which is a base for this project.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
