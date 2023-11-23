import { useGqlClient } from '../../components/useGqlClient/useGqlClient'
import {
  useFindGroupsQuery,
  useSetGroupsMutation,
  useUserQuery,
} from '../../gql/react-query'
import { useList, useSet } from 'react-use'
import { ItemSelector } from '../../components/ItemSelector/ItemSelector'
import { InputSelector } from '../../components/InputSelector/InputSelector'
import { useEffect } from 'react'
import { HiCog } from 'react-icons/hi'

export default function SettingsGroups() {
  const client = useGqlClient()
  const userQuery = useUserQuery(client)
  const [elements, { updateAt }] = useList<string[]>([])
  const setGroupsMutation = useSetGroupsMutation(client, {
    onSuccess: () => {
      userQuery.refetch()
    },
  })
  const groupsQuery = useFindGroupsQuery(
    client,
    { search: elements },
    { enabled: false }
  )
  const [selectedGroups, { toggle, has }] = useSet<string>()

  useEffect(() => {
    if (!elements.length) return
    for (const section of elements.slice(0, 6)) {
      if (section.length === 0) return
    }

    groupsQuery.refetch()
  }, [elements])

  return (
    <div className="prose">
      <h2>Grupy</h2>
      <h3>Twoje aktualne grupy</h3>
      <div className="flex flex-wrap gap-1 p-2">
        {userQuery.data?.user.groups.length === 0 && (
          <div className="rounded-lg border-2 border-black px-4 py-1">
            <span className="font-semibold italic">Brak</span>
          </div>
        )}
        {userQuery.data?.user.groups.map((group) => (
          <div
            key={group}
            className="rounded-lg border-2 border-black px-4 py-1"
          >
            <span className="font-semibold">{group}</span>
          </div>
        ))}
      </div>
      <h3>Zmień grupy (ręcznie)</h3>
      <p className="italic">
        Wpisuj 1 grupę na jedną linijkę. Zalecam kopiować nazwy grup z planu
        zajęć. Wielkość liter ma znaczenie.
      </p>
      <div className="grid grid-cols-2 gap-2">
        <textarea
          id="manual-input"
          className="input input-bordered col-span-2 h-24 border-2 border-black font-mono"
        ></textarea>
        <button
          className="btn"
          onClick={() => {
            const i = document.getElementById(
              'manual-input'
            ) as HTMLTextAreaElement

            if (!i) return

            i.value = userQuery.data?.user.groups.join('\n') ?? ''
          }}
        >
          Wczytaj z obecnych grup
        </button>
        <button
          className="btn"
          onClick={() =>
            setGroupsMutation.mutate({
              groups: (
                document.getElementById('manual-input') as HTMLTextAreaElement
              ).value
                .split('\n')
                .filter((v) => !!v),
            })
          }
        >
          {setGroupsMutation.isPending ? (
            <HiCog className="animate-spin" />
          ) : (
            'Zapisz'
          )}
        </button>
      </div>

      <h3>Zmień grupy (beta)</h3>
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
      <h4>Numery grup</h4>
      <p>Przykładowe numery: 17c, 1w, 128l</p>
      <InputSelector onChange={(v) => updateAt(6, v)} />
      <h4>Sugerowane grupy</h4>
      <div className="space-y-4 pl-4">
        {groupsQuery.data?.groups.map((group) => (
          <div className="flex list-none items-center gap-2" key={group}>
            <input
              className="checkbox"
              type="checkbox"
              checked={has(group)}
              onChange={() => toggle(group)}
            />
            {group}
          </div>
        ))}
      </div>
      <button
        className="btn my-4"
        onClick={() =>
          setGroupsMutation.mutate({
            groups: Array.from(selectedGroups),
          })
        }
      >
        {setGroupsMutation.isPending ? (
          <HiCog className="animate-spin" />
        ) : (
          'Zapisz'
        )}
      </button>
    </div>
  )
}
