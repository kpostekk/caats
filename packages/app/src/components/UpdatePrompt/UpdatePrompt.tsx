import { HiCloudDownload } from 'react-icons/hi'
import { useRegisterSW } from 'virtual:pwa-register/react'

export function UpdatePrompt() {
  const sw = useRegisterSW({
    immediate: true,
  })

  const [needRefresh] = sw.needRefresh
  const { updateServiceWorker } = sw

  if (!needRefresh) return null

  return (
    <div className="alert alert-info">
      <div className="flex w-full">
        <HiCloudDownload className="text-2xl" />
        <span>Nowa wersja dostępna!</span>
        <div className="grow" />
        <button
          className="btn btn-outline btn-secondary"
          onClick={() => updateServiceWorker(true)}
        >
          Zaktualizuj
        </button>
      </div>
    </div>
  )
}
