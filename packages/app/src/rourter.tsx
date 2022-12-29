import { createBrowserRouter } from 'react-router-dom'
import { NotFoundGlobal } from './404'
import { App } from './App'
import { Auth } from './Auth'
import { Dashboard } from './Dashboard'
import { Home } from './Home'
import { Login } from './Login'
import { Settings } from './Settings'

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
                path: '/app/settings/groups',
                element: <div>Grupy</div>,
              },
            ],
          },
        ],
      },
    ],
  },
])
