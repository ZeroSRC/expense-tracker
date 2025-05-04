import type { ModuleOptions } from '@nuxtjs/i18n'

const i18n: ModuleOptions = {
  locales: [
    { code: 'en', name: 'English', file: 'en.json' },
    { code: 'th', name: 'ไทย', file: 'th.json' }
  ],
  defaultLocale: 'en',
  lazy: true,
  langDir: 'locales/',
  vueI18n: './vue-i18n.config.ts'

}

export default i18n
