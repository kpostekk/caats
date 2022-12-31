import { HiBeaker, HiQuestionMarkCircle } from 'react-icons/hi'
import { createBrowserRouter } from 'react-router-dom'
import { NotFoundGlobal } from './pages/404'
import { Auth } from './Auth'
import { InputList } from './components/InputList/InputList'
import { Dashboard } from './pages/Dashboard'
import { SettingsGroups } from './pages/Settings/Groups'
import { Settings } from './pages/Settings/Settings'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { App } from './pages/App'
import { Logout } from './pages/Logout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFoundGlobal />,
  },
  {
    path: '/login/',
    element: <Login />,
  },
  {
    path: '/logout/',
    element: <Logout />,
  },
  {
    path: '/app/',
    element: <Auth />,
    children: [
      {
        path: '/app/',
        element: <App />,
        children: [
          {
            path: '/app/',
            element: <Dashboard />,
          },
          {
            path: '/app/settings/',
            element: <Settings />,
            children: [
              {
                path: '/app/settings/',
                element: (
                  <div className="space-y-2">
                    <div className="alert alert-info">
                      <div>
                        <HiBeaker />
                        <span>
                          Obecnie ustawienia są funkcjonalnością
                          eksperymentalną!
                        </span>
                      </div>
                    </div>
                    <div className="alert alert-info">
                      <div>
                        <HiQuestionMarkCircle />
                        <span>
                          Wykorzystaj{' '}
                          <a className="link" href="/graphiql">
                            GraphiQL
                          </a>{' '}
                          do zmian, jeżeli nie są dostępne w ustawieniach.
                        </span>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                path: '/app/settings/groups/',
                element: <SettingsGroups />,
              },
            ],
          },
        ],
      },
    ],
  },
])
