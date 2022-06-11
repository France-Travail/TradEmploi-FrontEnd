# PE TRANSLATE

## Requirements

Node, Angular | Version
--- | --- 
Node | 12.18
angular/cli | 10.1.3
firebase tools | 10.6.0


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
    'zh-CN',
    'zh-HK',
    'en-PK',
    'af-ZA',
    'sq-AL',
    'am-ET',
    'hy-AM',
    'az-AZ',
    'eu-ES',
    'bn-BD',
    'bn-IN',
    'bs-BA',
    'my-MM',
    'zh-TW',
    'gl-ES',
    'ka-GE',
    'is-IS',
    'jv-ID',
    'kk-KZ',
    'km-KH',
    'lo-LA',
    'mk-MK',
    'ml-IN',
    'mr-IN',
    'mn-MN',
    'ne-NP',
    'sr-RS',
    'si-LK',
    'su-ID',
    'sw-TZ',
    'ta-MY',
    'ta-SG',
    'ta-LK',
    'uk-UA',
    'ur-IN',
    'ur-PK',
    'uz-UZ',
    'zu-ZA',
  ],
  organization: {
    name: 'XXXX',
    organizationUser: 'Conseiller',
	  etabsDomain: ' ',
	  officalDomain: ' ',
    cgus: "Nous utilisons des cookies pour nous assurer de votre sécurité. Nous n'utilisons pas de cookies pour vous conseiller et nous ne vendons pas vos données à des tiers.",
    cgusEnglish: `We use cookies to ensure your security. We do not use cookies to advise you and we do not sell your data to third parties.`,
    entretiens: ['Accueil', 'Inscription', 'Indemnisation', 'Accompagnement', 'Autres'],
  },
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
microsoftSpeechConfig.region | the microsoft azure speech to text api region


## List of optional parameters in the params.ts file

Name | Description
--- | --- 
defaultPassword | the default password used to create a new firebase user account **Not needed if firebase login is activated**
excludedLanguagesFromAzureSTT | the excludedLanguages will continue to use the google api for the speech to text api even if the microsoft azure api is enabled
organization.name | your organization name
organization.organizationUser | Main user of your app
organization.cgus | your organisation's General Conditions of Use (GCU) in french
organization.cgusEnglish | your organisation's General Conditions of Use (GCU) in english
organization.entretiens | type of interviews

## Authentication mode
the default authentication mode is the firebase authentication with firestore.

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

