import { useState } from 'react'
import { HiBeaker } from 'react-icons/hi'
import { InputList } from '../../components/InputList/InputList'
import { MutationResponse } from '../../components/MutationResponse/MurtationResponse'
import { useGqlClient } from '../../components/useGqlClient/useGqlClient'
import {
  useSetGroupsMutation,
  useGetCurrentGroupsQuery,
} from '../../gql/react-query'
import { useDebounce } from 'react-use'
import { GroupsAutocomplete } from '../../components/GroupsAutocomplete/GroupsAutocomplete'

export function SettingsGroups() {
  const client = useGqlClient()
  const [groups, setGroups] = useState<string[]>([])
  useGetCurrentGroupsQuery(
    client,
    {},
    {
      onSuccess: ({ me: { groups } }) => setGroups(groups),
    }
  )
  const mutateGroups = useSetGroupsMutation(client)

  useDebounce(
    () => {
      mutateGroups.mutate({ groups })
    },
    200,
    [groups]
  )

  return (
    <div className="prose">
      {/* <MutationResponse mutation={mutateGroups} /> */}
      <h3>Zmień grupy</h3>
      {groups ? (
        <>
          <InputList initialItems={groups} onUpdate={setGroups} />
        </>
      ) : (
        <>
          <div className="flex animate-pulse gap-1">
            <div className="bg-base-200 h-2 w-48" />
            <div className="bg-base-200 h-2 w-24" />
          </div>
        </>
      )}
    </div>
  )
}
