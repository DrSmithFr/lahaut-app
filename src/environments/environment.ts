// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  fake_api:   true,
  debug:      true,
  url_api:    'https://ms-base',
  logo: {
    light: {
      small: 'assets/corporate/logo/logo.png',
      large: 'assets/corporate/logo/logo_large.png',
    },
    dark: {
      small: 'assets/corporate/logo/logo_dark.png',
      large: 'assets/corporate/logo/logo_large_dark.png',
    }
  }
};

