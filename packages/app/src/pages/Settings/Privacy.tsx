import { HiExternalLink, HiTrash } from 'react-icons/hi'

export default function () {
  return (
    <div className="prose">
      <h2>Prywatność</h2>
      <p className="border-y-warning text-warning border-y-2 p-2 font-semibold italic">
        Work in progress
      </p>
      <h3>Usuwanie konta</h3>
      <button className="btn btn-error btn-outline">
        <HiTrash className="mr-2" /> Usuń konto
      </button>
      <h3>Polityki prywatności</h3>
      <a href="https://www.cloudflare.com/privacypolicy/" target="_blank">
        <p>
          <HiExternalLink className="inline" /> Polityka prywatności Cloudflare
        </p>
      </a>
      <a
        href="https://github.com/kpostekk/caats/blob/main/PRIVACY.md"
        target="_blank"
      >
        <p>
          <HiExternalLink className="inline" /> Polityka prywatności CaaTS
        </p>
      </a>
    </div>
  )
}
