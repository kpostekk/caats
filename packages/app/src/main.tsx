import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { Settings } from 'luxon'
import './index.css'

Settings.defaultLocale = navigator.language
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <React.Suspense>
        <RouterProvider router={router} />
      </React.Suspense>
    </QueryClientProvider>
  </React.StrictMode>
)
