import { gqlClient } from './gql-client'
import { useAppQuery } from './gql/react-query'
import {
  FaArrowDown,
  FaBookOpen,
  FaDiscord,
  FaGhost,
  FaGithub,
} from 'react-icons/fa'
import { LoginGoogle } from './components/LoginGoogle/LoginGoogle'

export function Home() {
  const appQuery = useAppQuery(gqlClient)

  return (
    <div className="min-h-screen w-full">
      <div className="grid h-screen w-full place-content-center place-items-center gap-4 sm:grid-cols-1 md:grid-cols-2 md:p-24 lg:p-64">
        <div>
          <h1 className="text-6xl font-extrabold">CaaTS</h1>
          <p className="my-2 text-xl font-semibold">
            Cats as a Timetable Service
          </p>
          {appQuery.data ? (
            <p className="my-2 opacity-80">v{appQuery.data.app?.version}</p>
          ) : (
            <div className="bg-secondary h-2 w-1/3 animate-pulse rounded" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <LoginGoogle />
          <a href="#about" className="btn btn-secondary">
            <FaArrowDown className="mr-2" />
            Dowiedz się więcej
          </a>
        </div>
      </div>
      <div id={'about'} className="p-16 md:px-24 lg:px-32">
        <h1>FAQ</h1>
        <div className="lg:gird-cols-6 grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="prose">
            <h2>Dlaczego?</h2>
            <p>Dlaczego nie można srać do paczkomatu?</p>
            <p>No pytam się</p>
          </div>
          <div className="prose">
            <h2>Jak to działa?</h2>
            <p>Dobrze</p>
          </div>
        </div>
      </div>
      <footer className="border-t-secondary border-t px-6 pt-12">
        <div className="flex w-full flex-wrap justify-center gap-12">
          <div className="prose prose-p:my-1">
            <p>
              <a href="https://github.com/kpostekk/caats">
                <FaGithub className="mr-2 inline-block" />
                github
              </a>
            </p>
            <p>
              <a href="https://github.com/kpostekk/caats/PRIVACY.md">
                <FaGhost className="mr-2 inline-block" />
                polityka prywatności
              </a>
            </p>
            <p>
              <a href="https://github.com/kpostekk/caats/TOS.md">
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
        <p className="pt-2 text-center italic opacity-20">
          Crafted by Krystian Postek
        </p>
        <p className="py-2 text-center italic opacity-20">
          Thanks to <i>Yumii</i> for scraper performance improvements
        </p>
      </footer>
    </div>
  )
}
