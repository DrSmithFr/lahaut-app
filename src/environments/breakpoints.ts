// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const breakpoint = {
  mobile: 500,
  tablet: 900,
  desktop: 1200,
}
export const mediaQuery = {
  mobileXs: `(max-width: ${breakpoint.mobile - 1}px)`,
  mobileXl: `(min-width: ${breakpoint.mobile}px) and (max-width: ${breakpoint.tablet - 1}px)`,
  tablet: `(min-width: ${breakpoint.tablet}px) and (max-width: ${breakpoint.desktop - 1}px)`,
  desktop: `(min-width: ${breakpoint.desktop}px)`,
};

