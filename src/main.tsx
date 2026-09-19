import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { createRouter } from './router'

const rootElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)

try {
  const router = createRouter()
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
} catch (err) {
  console.error('Error al inicializar la aplicación:', err)
  root.render(
    <div style={{ padding: '20px', color: 'red', fontFamily: 'sans-serif' }}>
      <h2>Error al cargar la aplicación</h2>
      <pre>{String(err)}</pre>
    </div>
  )
}
