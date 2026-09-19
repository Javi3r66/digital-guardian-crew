import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => <Outlet />,
  errorComponent: ({ error }: { error: any }) => (
    <div style={{ padding: '30px', background: '#111', color: '#ff5555', fontFamily: 'monospace' }}>
      <h2>Error exacto en la aplicación:</h2>
      <pre>{error?.stack || error?.message || String(error)}</pre>
    </div>
  ),
})
