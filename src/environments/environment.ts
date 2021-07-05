// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appClientName: 'V1',

  baseUrl: window.location.protocol + '//' + window.location.hostname + ':',
  authApiUrl: '9010/auth-api',
  employeeApiUrl: '8080/api',
  purchaseApiUrl: '8081/api'

};

