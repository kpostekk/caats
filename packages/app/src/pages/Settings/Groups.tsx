import { useState } from 'react'
import { InputList } from '../../components/InputList/InputList'
import { useGqlClient } from '../../components/useGqlClient/useGqlClient'
import {
  useSetGroupsMutation,
  useGetCurrentGroupsQuery,
} from '../../gql/react-query'
import { useDebounce, useList } from 'react-use'
import { ItemSelector } from '../../components/ItemSelector/ItemSelector'

export default function SettingsGroups() {
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

  const [elements, { updateAt }] = useList<string[]>([])

  return (
    <div className="prose">
      {/* <MutationResponse mutation={mutateGroups} /> */}
      <h2>Grupy</h2>
      <h3>Zmień grupy</h3>
      <p>
        Regex:
        <pre>
          {'^'}
          {elements.slice(0, 3).map((v) => `[${v.join('')}]`)}
          {' ' +
            `(${(elements[3] ?? []).join('|')})` +
            '[.]' +
            `(${(elements[4] ?? []).join('|')})`}
          {' (-|(OB[.])?[A-Z]+|[A-Z]_[A-Z]+) [0-9]+[a-z]' +
            (elements[5][0] ?? '') +
            '$'}
        </pre>
      </p>
      <h4>Lokalizacja</h4>
      <ItemSelector
        items={['W', 'G', 'B']}
        labels={['Warszawa', 'Gdańsk', 'Bytom']}
        onChange={(v) => updateAt(0, v)}
      />
      <h4>Kierunek</h4>
      <ItemSelector
        items={['I', 'G', 'A', 'Z', 'K', 'L']}
        labels={[
          'Informatyka',
          'Grafika',
          'Architektura',
          'Zarządzanie',
          'Kulturoznawstwo',
          'Lektorat/Studium Języków Obcych',
        ]}
        onChange={(v) => updateAt(1, v)}
      />
      <h4>Tryb studiowania</h4>
      <ItemSelector
        items={['s', 'n', 'i']}
        labels={['Stacjonarne', 'Niestacjonarne', 'Internetowe']}
        onChange={(v) => updateAt(2, v)}
      />
      <h4>Stopień studiów</h4>
      <ItemSelector
        items={['I', 'II', 'III', 'PD']}
        labels={[
          'Studia I stopnia',
          'Studia II stopnia',
          'Studia III stopnia',
          'Studia podyplomowe',
        ]}
        onChange={(v) => updateAt(3, v)}
      />
      <h4>Semestr</h4>
      <ItemSelector
        items={Array.from({ length: 8 }).map<string | number>((_, i) => i + 1)}
        labels={(v) => (typeof v === 'number' ? `Semestr ${v}` : String(v))}
        onChange={(v) => updateAt(4, v.map(String))}
      />
      <h4>Język</h4>
      <ItemSelector
        items={[' ang', '']}
        labels={['Angielski', 'Polski']}
        onChange={(v) => updateAt(5, v.map(String))}
        singleSelect
      />
    </div>
  )
}
