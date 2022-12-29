import { LoginGoogle } from './components/LoginGoogle/LoginGoogle'

export function Login() {
  return (
    <div className="h-screen w-screen p-4">
      <div className="mx-auto grid h-full max-w-3xl grid-cols-1 place-content-center">
        <div className="prose">
          <h1>Zaloguj się</h1>
          <div className="w-72">
            <LoginGoogle />
          </div>
        </div>
      </div>
    </div>
  )
}
