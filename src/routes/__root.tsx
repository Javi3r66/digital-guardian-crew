import { createRootRoute, HeadContent, Scripts, Outlet } from '@tanstack/react-router'
import css from '../index.css?url' // O '../app.css?url' según el nombre de tu archivo CSS

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Red Violeta Ciberprevención' },
    ],
    links: [
      { rel: 'stylesheet', href: css },
    ],
  }),
  component: RootComponent,
  errorComponent: ({ error }: { error: any }) => (
    <div style={{ padding: '30px', background: '#111', color: '#ff5555', fontFamily: 'monospace' }}>
      <h2>Error exacto en la aplicación:</h2>
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
