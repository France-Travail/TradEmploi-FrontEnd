export const environment = {
  name:"qualification",
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBvoKDYur2Gfaq9MUvWM2vv7ki6eCooShk",
    authDomain: "pole-emploi-trad-recette.firebaseapp.com",
    databaseURL: "https://pole-emploi-trad-recette.firebaseio.com",
    projectId: "pole-emploi-trad-recette",
    storageBucket: "pole-emploi-trad-recette.appspot.com",
    messagingSenderId: "101786672385",
    appId: "1:101786672385:web:73e88841232aa2d90bcf00"
  },
  gcp: {
    apiKey: 'AIzaSyBraAcmG6FhlK4A9hCOfo96_s_OvYXEciQ'
  },
  api: {
    graphqlUrl: 'https://pole-emploi-trad-server.eu-de.cf.appdomain.cloud/graphql',
    login: 'ludo',
    password: '7YQZQJmmSyab7xT',
    provider: 'GOOGLE',
    defaultLanguage: 'fr-FR'
  },
  sentry:{
    url:'https://953593ebcd8a40b4a2e743176c9488b8@sentry.io/5180549'
  },
  firefunction:{
    url:'https://us-central1-pole-emploi-trad-dev.cloudfunctions.net/rates',
    login: 'ludo', 
    password: '_#Q5g_1i9Z6lRFC'
  }
};