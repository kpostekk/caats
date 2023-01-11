import { DateTime } from 'luxon'
import { useAuthStore } from '../../states/auth'

export function Greeting() {
  const [userName] = useAuthStore(({ auth }) => [
    auth?.user.name ?? 'nieznajomy',
  ])
  const now = DateTime.local()

  const [name] = userName.split(' ')

  if (now.hour > 1 && now.hour < 6)
    return (
      <>
        Idź spać {name} <span className="whitespace-nowrap">{'ಠ_ಠ'}</span>
      </>
    )
  if (now.hour >= 6 && now.hour < 12)
    return (
      <>
        Dzień dobry {name} <span className="whitespace-nowrap">{'(✿◡‿◡)'}</span>
      </>
    )
  if (now.hour >= 12 && now.hour < 18)
    return (
      <>
        Hejka {name} <span className="whitespace-nowrap">（＾∀＾●）ﾉｼ</span>
      </>
    )
  if (now.hour >= 18 && now.hour < 22)
    return (
      <>
        Dobry wieczór {name}{' '}
        <span className="whitespace-nowrap">{'(◕‿◕✿)'}</span>
      </>
    )
  if (now.hour >= 22 || now.hour <= 1)
    return (
      <>
        Dobranoc {name}{' '}
        <span className="whitespace-nowrap">{'(。・∀・)ノ'}</span>
      </>
    )

  return <>Cześć, {name}</>
}
