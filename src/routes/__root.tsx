import { createRootRoute, HeadContent, Scripts, Outlet } from '@tanstack/react-router'
import appCss from '../styles.css?url'
import { Footer } from '../components/Footer'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Red Violeta Ciberprevención' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
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
        <Footer />
        <Scripts />
      </body>
    </html>
  )
}
