import { HiExternalLink, HiHeart } from 'react-icons/hi'

type ThanksForProps = {
  who: string
  links: [string, string][]
  what: string
}

function ThanksFor(props: ThanksForProps) {
  return (
    <>
      <h3 className="flex items-center gap-2">
        <HiHeart /> {props.who}
      </h3>
      <p>{props.what}</p>
      {props.links.map(([name, link]) => (
        <a
          key={name}
          href={link}
          className="link-hover flex items-center gap-2"
        >
          <HiExternalLink />
          {name}
        </a>
      ))}
    </>
  )
}

export default function Thanks() {
  return (
    <div className="prose">
      <h2 className="text-2xl font-bold">Podziękowania</h2>
      <ThanksFor
        who="Izabela Pawlukowska"
        what="Podziękowania za design aplikacji, UX review, dobór grafik oraz wsparcie przy projektowaniu UI."
        links={[
          [
            'Linked in',
            'https://www.linkedin.com/in/izabela-pawlukowska-7aa485238/',
          ],
        ]}
      />
      <ThanksFor
        who="Aleksandra Indulska"
        what="Podziękowania za optymalizacje scrapowania i przetwarzania danych oraz UX/UI review."
        links={[
          ['Linked in', 'https://www.linkedin.com/in/aleksandra-indulska/'],
        ]}
      />
      <ThanksFor
        who="Rafał Opiłowski"
        what="Podziękowania za prace nad scraperem do Altapi, którego fork jest używany w aplikacji."
        links={[['Github', 'https://github.com/rafalopilowski1']]}
      />
    </div>
  )
}
