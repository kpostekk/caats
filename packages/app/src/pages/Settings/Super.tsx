import { useState } from 'react'
import { useGqlClient } from '../../components'
import { useCreateScraperMutation } from '../../gql/react-query'

export default function Settings() {
  const client = useGqlClient()
  const createBotMutation = useCreateScraperMutation(client)

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
    </div>
  )
}
