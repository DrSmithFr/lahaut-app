// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  fake_api:   false,
  debug:      false,
  api : {
    url: 'https://lahautparapente.fr/backend',
    version: '1.0.0'
  },
  locale:     'fr-FR',
  locales:    ['fr-FR', 'en-EN', 'es-ES'],
  theme: {
    light: '#fff',
    dark: '#0c0c0c'
  },
  logo: {
    light: {
      small: 'assets/corporate/logo/logo_new.png',
      large: 'assets/corporate/logo/logo_large_new.png',
    },
    dark: {
      small: 'assets/corporate/logo/logo_new.png',
      large: 'assets/corporate/logo/logo_large_new.png',
    }
  },
  google: {
    analytics: 'UA-132202996-1',
  }
};

