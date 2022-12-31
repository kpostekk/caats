import { Combobox } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import { useGetGroupsAutoCompleteQuery } from '../../gql/react-query'
import { useGqlClient } from '../useGqlClient/useGqlClient'

export type GroupsAutocompleteProps = {
  value: string
  onChange?: (value: string) => void
}

export function GroupsAutocomplete(props: GroupsAutocompleteProps) {
  const client = useGqlClient()
  const [inputValue, setInputValue] = useState(props.value)
  const groups = useGetGroupsAutoCompleteQuery(
    client,
    {
      search: inputValue.trim(),
    },
    {
      enabled: false,
    }
  )

  useDebounce(() => groups.refetch(), 100, [inputValue])
  // useEffect(() => setInputValue(props.value), [props.value])
  useEffect(() => props.onChange?.(inputValue), [inputValue])

  return (
    <div>
      <Combobox value={inputValue} onChange={setInputValue}>
        <Combobox.Input
          className="input input-bordered"
          onChange={(event) => setInputValue(event.target.value)}
        />
        <Combobox.Options className="card card-bordered bg-base-100 absolute list-none p-0">
          <div className="flex flex-col p-4">
            {groups.data?.autocompleteGroups?.map((person) => (
              <Combobox.Option
                className="btn btn-outline"
                key={person}
                value={person}
              >
                {person}
              </Combobox.Option>
            ))}
          </div>
        </Combobox.Options>
      </Combobox>
    </div>
  )
}
