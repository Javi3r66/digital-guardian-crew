import { createRootRoute, HeadContent, Scripts, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  head: () => ({
    links: [
      { rel: 'stylesheet', href: '/app.css' },
    ],
  }),
  component: RootComponent,
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
