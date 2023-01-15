import { Settings } from 'luxon'
import '../src/index.css'

Settings.defaultLocale = navigator.language

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
