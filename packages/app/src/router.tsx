import { createBrowserRouter } from 'react-router-dom'
import { Auth } from './Auth'
import { lazy } from 'react'
import { AppErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'

const Home = lazy(() => import('./pages/Home'))
const NotFound = lazy(() => import('./pages/404'))
const Login = lazy(() => import('./pages/Login'))
const Logout = lazy(() => import('./pages/Logout'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const App = lazy(() => import('./pages/App'))
const Settings = lazy(() => import('./pages/Settings/Settings'))
const SettingsGroups = lazy(() => import('./pages/Settings/Groups'))
const SettingsGeneral = lazy(() => import('./pages/Settings/General'))
const SettingsIcs = lazy(() => import('./pages/Settings/ICS'))
const SettingsSafety = lazy(() => import('./pages/Settings/Safety'))
const SettingsPrivacy = lazy(() => import('./pages/Settings/Privacy'))
const SettingsSuper = lazy(() => import('./pages/Settings/Super'))
const Schedule = lazy(() => import('./pages/Schedule'))
const Calendar = lazy(() => import('./pages/Calendar/Calendar'))
const CalendarDay = lazy(() => import('./pages/Calendar/CalendarDay'))
const Search = lazy(() => import('./pages/Search'))
const Event = lazy(() => import('./pages/Event'))
const Status = lazy(() => import('./pages/Status'))

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
    errorElement: <AppErrorBoundary />,
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
                element: <SettingsGeneral />,
              },
              {
                path: '/app/settings/groups/',
                element: <SettingsGroups />,
              },
              {
                path: '/app/settings/ics/',
                element: <SettingsIcs />,
              },
              {
                path: '/app/settings/safety/',
                element: <SettingsSafety />,
              },
              {
                path: '/app/settings/privacy/',
                element: <SettingsPrivacy />,
              },
              {
                path: '/app/settings/super/',
                element: <SettingsSuper />,
              },
            ],
          },
          {
            path: '/app/search',
            element: <Search />,
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
          {
            path: '/app/event/:id/',
            element: <Event />,
          },
          {
            path: '/app/status/',
            element: <Status />,
          },
        ],
      },
    ],
  },
])
