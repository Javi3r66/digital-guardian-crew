import { createRootRoute, HeadContent, Scripts, Outlet } from '@tanstack/react-router'
import appCss from '../styles.css?url'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'

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
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Red Violeta Ciberprevención',
          url: 'https://redvioletaciberprevencion.es',
          sameAs: [
            'https://www.instagram.com/redvioletaciber/',
            'https://www.facebook.com/redvioletaciber',
          ],
        }),
      },
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
        <SiteHeader />
        <Outlet />
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  )
}
