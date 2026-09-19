import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import * as RouterModule from './router'

// Detecta automáticamente si la exportación es default o nombrada (createRouter, getRouter, etc.)
const routerInstance = 
  RouterModule.default || 
  RouterModule.router || 
  (typeof RouterModule.createRouter === 'function' ? RouterModule.createRouter() : null) ||
  (typeof RouterModule.getRouter === 'function' ? RouterModule.getRouter() : null)

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML && routerInstance) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <RouterProvider router={routerInstance} />
    </React.StrictMode>
  )
}
