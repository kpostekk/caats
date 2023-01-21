import { useCallback } from 'react'
import { HiCloudDownload } from 'react-icons/hi'
import { useRegisterSW } from 'virtual:pwa-register/react'

export function UpdatePrompt() {
  const sw = useRegisterSW({
    immediate: true,
  })

  const [needRefresh] = sw.needRefresh
  const { updateServiceWorker } = sw

  const update = useCallback(() => {
    updateServiceWorker(true)
  }, [updateServiceWorker])

  if (!needRefresh) return null

  return (
    <div className="text-warning flex w-full items-center px-2 md:col-span-3">
      <div className="flex items-center">
        <HiCloudDownload className="absolute mr-2 animate-ping text-2xl" />
        <HiCloudDownload className="relative mr-2 text-2xl" />
      </div>
      <span className="font-bold uppercase">Nowa wersja dostępna!</span>
      <div className="grow" />
      <button className="btn btn-link text-white" onClick={() => update()}>
        Zaktualizuj
      </button>
    </div>
  )
}
