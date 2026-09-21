import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  return (
    <div>
      <h1>Digital Guardian Crew</h1>
      <p style={{ color: '#10b981', fontWeight: 'bold' }}>
        ✓ Aplicación y rutas compiladas con éxito en Vercel.
      </p>
    </div>
  )
}
