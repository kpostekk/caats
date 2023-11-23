import { useGqlClient } from '../../components'
import { useCreateSubscriptionMutation } from '../../gql/react-query'

export default function ICSSettings() {
  const client = useGqlClient()
  const createSubscription = useCreateSubscriptionMutation(client)

  return (
    <div className="prose">
      <h2>Subskrypcje ICS</h2>
      <p className="border-y-warning text-warning border-y-2 p-2 font-semibold italic">
        Work in progress
      </p>
      {createSubscription.isPending && (
        <p className="italic">Tworzenie subskrypcji...</p>
      )}
      {createSubscription.data ? (
        <>
          <p>Link do twojej subskrypcji</p>
          <a href={createSubscription.data.createSubscription.short!}>
            <p>{createSubscription.data.createSubscription.short!}</p>
          </a>
          <p>
            <button
              className="btn"
              onClick={() =>
                navigator.clipboard.writeText(
                  createSubscription.data.createSubscription.short!
                )
              }
            >
              Kopiuj do schowka
            </button>
          </p>
        </>
      ) : null}
      <p>
        <button className="btn" onClick={() => createSubscription.mutate({})}>
          Utwórz subskrypcję
        </button>
      </p>
    </div>
  )
}
