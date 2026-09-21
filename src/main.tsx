import React from 'react'
import ReactDOM from 'react-dom/client'

const App = () => {
  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif', textAlign: 'center' }}>
      <h1>Digital Guardian Crew</h1>
      <p style={{ color: '#10b981', fontWeight: 'bold' }}>✓ Aplicación desplegada con éxito en Vercel</p>
    </div>
  )
}

const rootElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
