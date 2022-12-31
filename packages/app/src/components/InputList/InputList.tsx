import { useEffect } from 'react'
import { HiBackspace, HiPlus } from 'react-icons/hi'
import { useList } from 'react-use'
import { GroupsAutocomplete } from '../GroupsAutocomplete/GroupsAutocomplete'

export type InputListProps = {
  initialItems: string[]
  onUpdate?: (items: string[]) => void
}

export function InputList(props: InputListProps) {
  const [items, { updateAt, push, removeAt, set }] = useList<string>(
    props.initialItems
  )
  useEffect(() => {
    set(props.initialItems)
  }, [props.initialItems])

  useEffect(() => {
    props.onUpdate?.(items)
  }, [items])

  return (
    <div className="my-2 space-y-2">
      <ul className="space-y-2 pl-0">
        {items.map((val, i) => (
          <li key={i} className="flex items-center gap-1">
            {/* <GroupsAutocomplete
              // className="input input-bordered input-sm"
              value={val ?? ''}
              onChange={({ currentTarget }) => updateAt(i, currentTarget.value)}
            /> */}
            <GroupsAutocomplete
              value={val ?? ''}
              onChange={(v) => updateAt(i, v)}
            />
            <button className="btn" onClick={() => removeAt(i)}>
              <HiBackspace className="mr-2" /> usuń
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <button
          disabled={items.length >= 25}
          className="btn"
          onClick={() => {
            if (items[items.length - 1] !== '') push('')
          }}
        >
          <HiPlus className="mr-2" /> Dodaj pole
        </button>
      </div>
    </div>
  )
}
