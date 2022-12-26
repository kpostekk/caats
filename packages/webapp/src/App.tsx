import { HiMenu } from 'react-icons/hi'
import { useAuthStore } from './states/auth'

export function App() {
  const picture = useAuthStore(({ auth }) => auth?.user.picture)

  return (
    <div className="navbar">
      <div className="navbar-start">
        <button className="btn btn-ghost">
          <HiMenu />
        </button>
      </div>
      <div className="navbar-center">
        <h1 className="text-3xl font-bold ">CaaTS</h1>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost aspect-square p-1">
          <img src={picture ?? undefined} />
        </button>
      </div>
    </div>
  )
}
