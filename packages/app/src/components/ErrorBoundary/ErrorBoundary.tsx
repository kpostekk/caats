import { HiFire } from 'react-icons/hi'
import { useRouteError } from 'react-router-dom'

export function AppErrorBoundary() {
  const error = useRouteError()

  if (!(error instanceof Error)) return <p>oof, error moment</p>

  return (
    <div className="container">
      <div className="prose mx-auto mt-20 rounded border-2 border-black p-4">
        <h1>
          <HiFire className="inline" /> Błąd aplikacji!
        </h1>
        <h2>{error.name}</h2>
        {error.cause ? <p>{JSON.stringify(error.cause)}</p> : null}
        <p>{error.message}</p>
        <pre>{error.stack}</pre>
        <p className="italic opacity-70">
          Jeżeli widzisz ten komunikat to musiało się stać coś bardzo
          strasznego! Będę wdzięczny za zgłoszenie tego błędu{' '}
          <a href="https://github.com/kpostekk/caats/issues">tutaj</a> lub
          wyślij mi{' '}
          <a
            href={`mailto:kpostekk@pjwstk.edu.pl?subject=${encodeURIComponent(
              'Błąd ' + error.name
            )}&body=${encodeURIComponent(error.stack || 'Brak stack trace')}`}
          >
            email
          </a>{' '}
          na adres <code>kpostekk@pjwstk.edu.pl</code>.
        </p>
        <div className="btn-group btn-group-horizontal">
          <a className="btn btn-secondary">Strona główna</a>
          <a className="btn btn-secondary">Panel główny</a>
        </div>
      </div>
    </div>
  )
}
