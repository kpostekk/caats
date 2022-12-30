import { HiBeaker, HiQuestionMarkCircle } from 'react-icons/hi'
import { createBrowserRouter } from 'react-router-dom'
import { NotFoundGlobal } from './404'
import { App } from './App'
import { Auth } from './Auth'
import { InputList } from './components/InputList/InputList'
import { Dashboard } from './Dashboard'
import { Home } from './Home'
import { Login } from './Login'
import { SettingsGroups } from './pages/Settings/Groups'
import { Settings } from './pages/Settings/Settings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFoundGlobal />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/app',
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
            path: '/app/settings',
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
                path: '/app/settings/groups',
                element: <SettingsGroups />,
              },
            ],
          },
        ],
      },
    ],
  },
])
