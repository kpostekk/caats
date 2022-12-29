import { useGoogleLogin } from '@react-oauth/google'
import { useState } from 'react'
import { FaGoogle, FaSpinner } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { gqlClient } from '../../gql-client'
import { useLoginMutation } from '../../gql/react-query'
import { useAuthStore } from '../../states/auth'

function useThreeState() {
  const [state, setState] = useState<boolean | null>(null)

  return {
    state,
    success: () => setState(true),
    failure: () => setState(false),
  }
}

export function LoginGoogle() {
  const navigate = useNavigate()
  const [loggingIn, setLoggingIn] = useState(false)
  const loginState = useThreeState()
  const updateAuth = useAuthStore(({ update }) => update)
  const isLoggedInAlready = useAuthStore(({ auth }) => !!auth)
  const loginMutation = useLoginMutation(gqlClient, {
    onSuccess: (response) => {
      updateAuth(response.authGoogle)
      loginState.success()
      setLoggingIn(false)
      navigate('/app')
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
    onNonOAuthError: loginState.failure,
    onError: loginState.failure,
  })

  if (isLoggedInAlready)
    return (
      <Link className="btn" to="/app">
        Przejdź do aplikacji
      </Link>
    )

  return (
    <>
      <button
        className={
          loginState.state === null
            ? 'btn'
            : loginState.state
            ? 'btn btn-success'
            : 'btn btn-error'
        }
        onClick={() => {
          setLoggingIn(true)
          googleLogin()
        }}
        disabled={loggingIn}
      >
        <div className="mr-2">
          {loggingIn ? <FaSpinner className="animate-spin" /> : <FaGoogle />}
        </div>
        Zaloguj się
      </button>
    </>
  )
}
