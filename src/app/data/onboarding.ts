import { Onboarding, OnboardingTitle } from '../models/vocabulary';

export const onboardingTabs: Onboarding[] = [
  {
    image: 'illu-accueil.png',
    indicationEN: 'Compatible devices',
    textEN: 'Use your phone, a tablet or a computer to discuss with your advisor in your language.',
  },
  {
    image: 'illu-chrome.png',
    indicationEN: 'Go to this website',
    textEN: 'Go to the website with a QR code or typing this adress on your chrome browser',
    browserEN: 'Only on Google chrome',
  },
  {
    image: 'illu-qrcode.png',
    indicationEN: 'How to scan a QR code',
    textEN: `Use the camera application on your phone to scan the QR code.
    If your device supports QR codes, a link to the website will appear on your screen.`,
  },
  {
    image: 'illu-name.png',
    indicationEN: 'Enter your firstname',
    textEN: 'Once on the translation site, enter your firstname.',
  },
  {
    image: 'illu-choice.png',
    indicationEN: 'Choose a language',
    textEN: 'Select your usual language among more 110 available languages.',
  },
];

export const onboardingTabsAdvisor: Onboarding[] = [
  {
    ...onboardingTabs[0],
    indicationFR: 'Appareils compatibles / ',
    textFR: 'Utilisez un téléphone, une tablette ou un ordinateur pour échanger avec votre conseiller dans votre langue.',
  },
  {
    ...onboardingTabs[1],
    indicationFR: 'Allez sur ce site / ',
    textFR: "Rendez-vous sur le site grâce à un QR code ou en saisissant l'adresse sur votre navigateur chrome",
    browserFR: 'Seulement sur Google chrome',
  },
  {
    ...onboardingTabs[2],
    indicationFR: 'Comment scanner un QR code / ',
    textFR: `Utiliser l'application photo de votre mobile pour scanner le QR code.
    Si votre téléphone supporte la lecture de QR code, un lien vers ce site apparaîtra sur votre écran.`,
  },
  {
    ...onboardingTabs[3],
    indicationFR: 'Entrez votre prénom / ',
    textFR: 'Une fois sur le site de traduction, saisissez votre prénom.',
  },
  {
    ...onboardingTabs[4],
    indicationFR: 'Choisir une langue / ',
    textFR: 'Sélectionner votre langue usuelle parmis plus de 110 langues disponibles.',
  },
];

export const onboardingTitle: OnboardingTitle = {
  helpEN: 'Start guide',
  descriptionEN: 'Presentation of the translation tool',
};
export const onboardbingTitleAdvisor: OnboardingTitle = {
  ...onboardingTitle,
  helpFR: 'Guide de démarrage / ',
  descriptionFR: "Présentation de l'outil de traduction /",
};
