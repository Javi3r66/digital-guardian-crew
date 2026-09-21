import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ fontWeight: 'bold', color: '#2563eb' }}>
          Inicio
        </Link>
      </header>
      <hr style={{ borderColor: '#e5e7eb' }} />
      <main style={{ marginTop: '20px' }}>
        <Outlet />
      </main>
    </div>
  ),
})
