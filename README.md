# Traduction

an instantaneous translation application between two people, one of whom is allophone, for Android and MacOS smartphone or tablet..

# Table of contents
[[_TOC_]]

# Philosophy and objective

The purpose of this application is describe in the [documentation](docs/documentation.md)

This project is the frontend of the application. The backend is **petranslate-back** project. Checks readme to install it.

# Installation

## Requirements
Node, Angular | Version
--- | --- 
Node | 20.9
angular/cli | 17.3.1
firebase tools | 13.0.3


## Create setting files
* under src, create the folder environments.
* under the new folder src/environments, create files: environment.ts, authflow.ts and params.ts
* fill the environment.ts and authflow.ts files with setting data, example:

**environement.ts**
```
export const environment = {
  name: 'os',
  production: false,
  firebaseConfig: {
    apiKey: 'XXXX',
    authDomain: 'XXXX',
    projectId: 'XXXX',
    storageBucket: 'XXXX',
    messagingSenderId: 'XXXX',
    appId: 'XXXX',
  },
  gcp: {
    gateWayUrl: 'XXXX',
  },
  microsoftSpeechConfig: {
    speechToTextEnabled: false,
    textToSpeechEnabled: false,
    key: 'XXXX',
    defaultEndpoint: 'XXXX',
    endpoints: {
      'XXXX': 'XXXX'
      'XXXX': 'XXXX'
    },
    region: 'XXXX',
  }
};
```

**authflow.ts**
```
import { AuthConfig } from 'angular-oauth2-oidc';
export const authCodeFlowConfig: AuthConfig = {
};
```

**params.ts**
```
export const params = {
  defaultPassword: 'XXXX',
  excludedLanguagesFromAzureSTT: [
    'en-PK',
    'bn-BD',
    'ta-MY',
    'ta-SG',
    'ta-LK',
    'ur-PK',
  ],
  languesPrioritaires: [
    'en-GB',
    'es-ES',
    'de-DE',
    'it-IT',
    'nl-NL',
    'pt-PT',
    'ja-JP',
    'ar-XA',
    'zh-CN',
    'jv-ID',
  ]
  // Use Login/Password Authentification
  oauthIdProvider: '',
  // Use google authent (for test)
  // oauthIdProvider: 'google.com',
  // Use OIDC authent
  // oauthIdProvider: 'oidc.idp-provider',
  oauthIdProvider: '',
  doubleAuth: false,
  authType: AuthType.loginPassword,
  organization: {
    name: 'XXXX',
    organizationUser: 'Conseiller',
    etabsDomain: ' ',
    officalDomain: ' ',
    cgus: "Nous utilisons des cookies pour nous assurer de votre sécurité. Nous n'utilisons pas de cookies pour vous conseiller et nous ne vendons pas vos données à des tiers.",
    cgusEnglish: `We use cookies to ensure your security. We do not use cookies to advise you and we do not sell your data to third parties.`,
  },
  subtitle: 'XXXX',
};
```

## List of mandatory parameters in the environment.ts file
Name | Description
--- | --- 
firebaseConfig | your app's Firebase project configuration
gcp.gateWayUrl | the gateway's url for your gcp backend project
firebaseConfig | your app's Firebase project configuration
microsoftSpeechConfig | settings for the microsoft azure speech to text api even when microsoftSpeechConfig.speechToTextEnabled is true
microsoftSpeechConfig.speechToTextEnabled | converting voice to text will use the azure speech to text api if true, false otherwise
microsoftSpeechConfig.textToSpeechEnabled | converting text to voice will use the azure text to speech api if true, false otherwise
microsoftSpeechConfig.key | the microsoft azure speech to text api key
microsoftSpeechConfig.defaultEndpoint | default endpoint for microsoft azure speech to text api
microsoftSpeechConfig.endpoints | endpoint of a specific language for microsoft azure speech to text api
microsoftSpeechConfig.region | the microsoft azure speech to text api region

## List of optional parameters in the params.ts file
Name | Description
--- | --- 
defaultPassword | the default password used to create a new firebase user account **Not needed if firebase login is activated**
excludedLanguagesFromAzureSTT | the excludedLanguages will continue to use the google api for the speech to text api even if the microsoft azure api is enabled
languesPrioritaires | list of languages on home page
oauthIdProvider | OAuth Provider ID used for authentication (let empty for login/password)
authType | Enum which define if we use authentication via login/password, via SSO, or both of them
headerButtons.indicators | Display indicators button in the header page
headerButtons.choice | Display indicators choice in the header page
headerButtons.CGU | Display CGU button in the header page
headerButtons.modality | Display modality button in the header page
headerButtons.personalData | Display personalData button in the header page
headerButtons.startGuide | Display startGuide button in the header page
organization.name | your organization name
organization.organizationUser | Main user of your app
organization.cgus | your organisation's General Conditions of Use (GCU) in french
organization.cgusEnglish | your organisation's General Conditions of Use (GCU) in english
subtitle | your subtitle in the header

## Authentication mode
The default authentication mode is the firebase authentication with firestore.

This mode is enabled when the authCodeFlowConfig.loginUrl param in the authflow.ts file is not defined.

Otherwise,when authCodeFlowConfig.loginUrl is defined, it means that authentication is based on the open id connect, using the authorization code flow.

So you need to have an authentication server,set the loginUrl
and others settings in authCodeFlowConfig to setup your sso environment and initialise the authentication code flow.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Deploy on your environment [dev|uat|prod]
1 - Build
```
$ npm run build:[dev|uat|prod]
```

2 - TEST on local

3 - Deploy
```
$ firebase deploy --project [dev|uat|prod]
```

4 - TEST
```
$ https://$GCP_PROJECT.firebaseapp.com
```

5 - TEST with Product owner
