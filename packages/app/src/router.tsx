import { HiBeaker, HiQuestionMarkCircle } from 'react-icons/hi'
import { createBrowserRouter } from 'react-router-dom'
import { Auth } from './Auth'
import { lazy } from 'react'

const Home = lazy(() => import('./pages/Home'))
const NotFound = lazy(() => import('./pages/404'))
const Login = lazy(() => import('./pages/Login'))
const Logout = lazy(() => import('./pages/Logout'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const App = lazy(() => import('./pages/App'))
const Settings = lazy(() => import('./pages/Settings/Settings'))
const SettingsGroups = lazy(() => import('./pages/Settings/Groups'))
const Schedule = lazy(() => import('./pages/Schedule'))
const Calendar = lazy(() => import('./pages/Calendar/Calendar'))
const CalendarDay = lazy(() => import('./pages/Calendar/CalendarDay'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
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
          {
            path: '/app/schedule/',
            element: <Schedule />,
          },
          {
            path: '/app/calendar/',
            element: <Calendar />,
          },
          {
            path: '/app/calendar/:date/',
            element: <CalendarDay />,
          },
        ],
      },
    ],
  },
])
