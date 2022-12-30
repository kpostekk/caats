import { useAppQuery } from '../gql/react-query'
import {
  FaArrowDown,
  FaBookOpen,
  FaDiscord,
  FaGhost,
  FaGithub,
} from 'react-icons/fa'
import { LoginGoogle } from '../components/LoginGoogle/LoginGoogle'
import { useGqlClient } from '../components/useGqlClient/useGqlClient'

export function Home() {
  const client = useGqlClient()
  const appQuery = useAppQuery(client)

  return (
    <div className="min-h-screen w-full">
      <div className="grid h-screen w-full place-content-center place-items-center gap-4 sm:grid-cols-1 md:grid-cols-2 md:p-24 lg:p-64">
        <div>
          <h1 className="select-none text-6xl font-extrabold">CaaTS</h1>
          <p className="my-2 text-xl font-semibold">
            Cats as a Timetable Service
          </p>
          {appQuery.data ? (
            <p className="text-base-300 my-2">
              nest: v{appQuery.data.app?.version}, app: v{APP_VERSION}
            </p>
          ) : (
            <div className="bg-base-300 h-2 w-1/3 animate-pulse rounded" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <LoginGoogle />
          <a
            href="https://github.com/kpostekk/caats/blob/main/README.md"
            className="btn btn-outline"
          >
            <FaArrowDown className="mr-2" />
            Dowiedz się więcej
          </a>
        </div>
      </div>
      <footer className="border-t-secondary border-t px-6 pt-12">
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
        </div>
        <div className="text-base-300 mx-auto max-w-xl pb-4 pt-8 text-sm">
          <p className="pt-2">
            Coded and designed by{' '}
            <a className="link" href="https://github.com/aleksandra-indulska">
              Krystian Postek
            </a>
          </p>
          <p className="py-2">
            Thanks to{' '}
            <a className="link" href="https://github.com/aleksandra-indulska">
              Aleksandra Indulska
            </a>{' '}
            for scraper performance improvements
          </p>
        </div>
      </footer>
    </div>
  )
}
