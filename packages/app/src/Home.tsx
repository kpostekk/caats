import { useState } from 'react'
import { gqlClient } from './gql-client'
import { useAppQuery, useLoginMutation } from './gql/react-query'
import { useGoogleLogin } from '@react-oauth/google'
import {
  FaArrowDown,
  FaBookOpen,
  FaDiscord,
  FaGhost,
  FaGithub,
  FaGoogle,
  FaSpinner,
} from 'react-icons/fa'
import { useMedia } from 'react-use'
import { useAuthStore } from './states/auth'

function useLoginState() {
  const [loginState, setLoginState] = useState<
    'not-logged' | 'logged-in' | 'failure' | 'logging-in'
  >('not-logged')

  return {
    loginState,
    success: () => setLoginState('logged-in'),
    failure: () => setLoginState('failure'),
    loggingIn: () => setLoginState('logging-in'),
  }
}

export function Home() {
  const appQuery = useAppQuery(gqlClient)

  const darkMode = useMedia('(prefers-color-scheme: dark)')
  const loginState = useLoginState()

  const updateAuth = useAuthStore(({ update }) => update)
  const loginMutation = useLoginMutation(gqlClient, {
    onSuccess: (response) => {
      updateAuth(response.authGoogle)
      loginState.success()
    },
    onError: () => loginState.failure(),
  })

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess(result) {
      loginMutation.mutate({
        code: result.code,
      })
    },
    onNonOAuthError() {
      loginState.failure()
    },
    onError() {
      loginState.failure()
    },
  })

  return (
    <div
      data-theme={darkMode ? 'black' : 'lofi'}
      className="min-h-screen w-full"
    >
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
          <button
            disabled={loginState.loginState === 'logging-in'}
            className={[
              'btn',
              loginState.loginState === 'not-logged' && 'btn-primary',
              loginState.loginState === 'failure' && 'btn-error',
              loginState.loginState === 'logged-in' && 'btn-success',
            ].join(' ')}
            onClick={() => {
              loginState.loggingIn()
              googleLogin()
            }}
          >
            <div className="mr-2">
              {loginState.loginState === 'logging-in' ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaGoogle />
              )}
            </div>
            Zaloguj się
          </button>
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
        <p className="py-4 text-center italic opacity-20">
          Made with too much coffee by Krystian Postek
        </p>
      </footer>
    </div>
  )
}
