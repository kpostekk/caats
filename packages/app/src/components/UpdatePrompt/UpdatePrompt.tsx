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
    <div className="text-warning flex w-full items-center">
      <HiCloudDownload className="mr-2 text-2xl" />
      <span>Nowa wersja dostępna!</span>
      <div className="grow" />
      <button
        className="btn btn-link text-white"
        onClick={() => updateServiceWorker(true)}
      >
        Zaktualizuj
      </button>
    </div>
  )
}
