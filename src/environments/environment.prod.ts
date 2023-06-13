// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  fake_api:   false,
  debug:      false,
  url_api:    'https://lahaut.heystudent.fr/backend',
  logo: {
    light: {
      small: 'assets/logo_new.png',
      large: 'assets/logo_large_new.png',
    },
    dark: {
      small: 'assets/logo_new.png',
      large: 'assets/logo_large_new.png',
    }
  }
};

