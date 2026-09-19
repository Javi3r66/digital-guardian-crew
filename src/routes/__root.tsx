import { createRootRoute, HeadContent, Scripts, Outlet } from '@tanstack/react-router'
import '../index.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Red Violeta Ciberprevención' },
    ],
  }),
  component: RootComponent,
  errorComponent: ({ error }: { error: any }) => (
    <div style={{ padding: '30px', background: '#111', color: '#ff5555', fontFamily: 'monospace' }}>
      <h2>Error detectado:</h2>
      <pre>{error?.stack || error?.message || String(error)}</pre>
    </div>
  ),
})

function RootComponent() {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  )
}
