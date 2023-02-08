import { useGqlClient } from '../components'
import { useStatusQuery, StatusQuery } from '../gql/react-query'

type ScraperStatusWidgetProps = {
  scraper: StatusQuery['ongoingScrapers'][0]
}

function ScraperStatusWidget(props: ScraperStatusWidgetProps) {
  return (
    <div className="flex rounded-xl border-2 border-black p-2">
      {props.scraper.currentTask ? (
        <div className="my-auto mr-4 ml-2 h-3 w-3 rounded-full bg-green-500" />
      ) : props.scraper.state === 'AWAITING' ? (
        <div className="my-auto mr-4 ml-2 h-3 w-3 rounded-full bg-cyan-400" />
      ) : (
        <div className="my-auto mr-4 ml-2 h-3 w-3 rounded-full bg-orange-400" />
      )}
      <div className="space-y-1">
        <p className="text-2xl font-bold">{props.scraper.alias}</p>
        <p className="italic opacity-50">{props.scraper.state}</p>
        {props.scraper.currentTask ? (
          <>
            <p className="text-lg font-bold">#{props.scraper.currentTask.id}</p>
            <p>Data: {props.scraper.currentTask.targetDate}</p>
          </>
        ) : (
          <>
            <p>Od: {new Date(props.scraper.lastSeen).toLocaleString()}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default function Status() {
  const client = useGqlClient()
  const statusQuery = useStatusQuery(
    client,
    {},
    {
      refetchInterval: 500,
    }
  )

  if (!statusQuery.data) return null

  return (
    <div className="container max-w-md space-y-2 p-2 md:px-0">
      {statusQuery.data.ongoingScrapers.map((scraper, i) => (
        <ScraperStatusWidget key={i} scraper={scraper} />
      ))}
    </div>
  )
}
