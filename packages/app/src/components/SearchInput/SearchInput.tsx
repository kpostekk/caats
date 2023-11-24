import { useEffect, useMemo, useState } from 'react'
import { useDebounce } from 'react-use'
import {
  GeneralizedSearchQuery,
  useGeneralizedSearchQuery,
} from '../../gql/react-query'
import { useGqlClient } from '../useGqlClient/useGqlClient'

export type SearchInputProps = {
  value: string
  onResults?: (results: GeneralizedSearchQuery) => void
  onChange?: (text: string) => void
  onDebouncing?: (debouncing: boolean) => void
  onFetching?: (fetching: boolean) => void
}

export function SearchInput(props: SearchInputProps) {
  const client = useGqlClient()
  const query = useGeneralizedSearchQuery(
    client,
    { input: props.value.trim() },
    { enabled: false },
  )

  const [debounced] = useDebounce(
    () => {
      if (props.value.length < 3) return
      query.refetch()
    },
    150,
    [props.value],
  )
  const isDebouncing = useMemo(() => !debounced(), [props.value, query.isFetching])

  useEffect(
    () => query.data && props.onResults?.(query.data),
    [query.data, props.onResults],
  )
  useEffect(
    () => props.onDebouncing?.(isDebouncing),
    [isDebouncing, props.onDebouncing],
  )
  useEffect(
    () => props.onFetching?.(query.isFetching),
    [query.isFetching, props.onFetching],
  )

  return (
    <div className="form-control h-24 w-full">
      <input
        className="input-lg mx-auto w-full rounded-xl border-2 border-black shadow"
        placeholder={"Wyszukaj..."}
        value={props.value}
        onChange={(e) => props.onChange?.(e.target.value.trimStart())}
      />
      <label className="label">
        <span className="label-text-alt" />
        <span className="label-text-alt">
          {props.value.length < 3 && <>Wpisz co najmniej 3 znaki</>}
          {query.isFetched && (
            <>Znaleziono {query.data?.findByDescription.length}/25 wyników</>
          )}
          {(query.isFetching || isDebouncing) && props.value.length > 0
            ? 'Wyszukuje...'
            : null}
        </span>
      </label>
    </div>
  )
}
