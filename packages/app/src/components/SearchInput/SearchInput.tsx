import { useEffect, useMemo, useState } from 'react'
import { useDebounce } from 'react-use'
import {
  GeneralizedSearchQuery,
  useGeneralizedSearchQuery,
} from '../../gql/react-query'
import { useGqlClient } from '../useGqlClient/useGqlClient'

export type SearchInputProps = {
  onChange?: (results: GeneralizedSearchQuery) => void
  onDebouncing?: (debouncing: boolean) => void
  onFetching?: (fetching: boolean) => void
}

export function SearchInput(props: SearchInputProps) {
  const [inputVal, setInputVal] = useState('')
  const client = useGqlClient()
  const query = useGeneralizedSearchQuery(
    client,
    { input: inputVal.trim() },
    { enabled: false }
  )

  const [debounced] = useDebounce(
    () => {
      if (inputVal.length < 3) return
      query.refetch()
    },
    1_000,
    [inputVal]
  )
  const isDebouncing = useMemo(() => !debounced(), [inputVal, query.isFetching])

  useEffect(
    () => query.data && props.onChange?.(query.data),
    [query.data, props.onChange]
  )
  useEffect(
    () => props.onDebouncing?.(isDebouncing),
    [isDebouncing, props.onDebouncing]
  )
  useEffect(
    () => props.onFetching?.(query.isFetching),
    [query.isFetching, props.onFetching]
  )

  return (
    <div className="form-control h-24 w-full">
      <input
        className="input-lg mx-auto w-full rounded-xl border-2 border-black shadow"
        placeholder={`przykładowo: skj smyk wykład`}
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value.trimStart())}
      />
      <label className="label">
        <span className="label-text-alt" />
        <span className="label-text-alt">
          {(query.isFetching || isDebouncing) && inputVal.length > 0
            ? 'Wyszukuje...'
            : null}
        </span>
      </label>
    </div>
  )
}
