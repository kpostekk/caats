import { useState } from 'react'
import { useGqlClient } from '../../components'
import { useCreateScraperMutation } from '../../gql/react-query'
import { useAuthStore } from '../../states/auth'

export default function Settings() {
  const client = useGqlClient()
  const createBotMutation = useCreateScraperMutation(client)
  const token = useAuthStore(({ auth }) => auth?.accessToken)
  const [tokenCopied, setTokenCopied] = useState(false)

  const [scraperName, setScraperName] = useState('')

  return (
    <div className="prose space-y-2">
      <h2>Dodaj scraper</h2>
      {createBotMutation.data ? (
        <>
          <h3>Oto twój token</h3>
          <div className="flex items-center gap-2">
            <pre>{createBotMutation.data.createScraper}</pre>
            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  createBotMutation.data.createScraper
                )
              }
              className="btn"
            >
              Kopiuj
            </button>
          </div>
        </>
      ) : null}
      <input
        placeholder="Nazwa scrapera"
        className="input input-bordered w-full border-2 border-black"
        value={scraperName}
        onChange={(e) => setScraperName(e.target.value)}
      />
      <button
        className="btn btn-outline"
        onClick={() =>
          createBotMutation.mutate({ name: scraperName ? scraperName : null })
        }
      >
        Dodaj
      </button>
      <h2>Devtools</h2>
      <div className="flex flex-wrap gap-2">
        <button
          className="btn btn-outline"
          onClick={() =>
            navigator.clipboard
              .writeText(token)
              .then(() => setTokenCopied(true))
          }
        >
          {!tokenCopied ? 'Skopiuj token' : 'Skopiowano token!'}
        </button>
        <button
          className="btn btn-outline"
          onClick={() => {
            localStorage.setItem(
              'graphiql:headers',
              JSON.stringify({
                authorization: `Bearer ${token}`,
              })
            )
          }}
        >
          Nadpisz headery graphiql
        </button>
      </div>
    </div>
  )
}
