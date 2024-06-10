import { ErrorDetail } from './errorType';

export const ERROR_FUNC_TRANSLATION: ErrorDetail  = {
    code: '400',
    description: 'La traduction est indisponible momentanément. Merci de réessayer plus tard'
};

export const ERROR_FUNC_STT: ErrorDetail  = {
    code: '401',
    description: 'Transcription de la voix au texte est indisponible momentanément. Merci de réessayer plus tard'
};

export const ERROR_FUNC_TTS: ErrorDetail  = {
    code: '402',
    description: 'Transcription du texte à la voix est indisponible momentanément. Merci de réessayer plus tard'
};

export const ERROR_FUNC_NOSOUND: ErrorDetail  = {
    code: '403',
    description: 'Pas de son détecté'
};

export const ERROR_FUNC_EXPORT_KPI: ErrorDetail  = {
    code: '404',
    description: 'Serveur est indisponible momentanément pour le fichier des kpis. Merci de réessayer plus tard'
};

export const ERROR_FUNC_EXPORT_STATS: ErrorDetail  = {
    code: '405',
    description: 'Serveur est indisponible momentanément pour le fichier des évaluations. Merci de réessayer plus tard'
};

export const ERROR_FUNC_SEND_STATS: ErrorDetail  = {
    code: '406',
    description: 'Le formulaire d\'évaluation n\'a pas pu être envoyée, il n\'est pas possible de le resaisir. Vous allez être redirigé vers la page d\'accueil.'
};

export const ERROR_FUNC_UNAUTHORIZEDMICRO: ErrorDetail  = {
    code: '407',
    description: 'Accès au microphone n\'est pas autorisé, veuillez l\'activer dans les paramètres du navigateur'
};

export const ERROR_FUNC_UNKNOWCHAT: ErrorDetail  = {
    code: '408',
    description: 'L\'espace de conversation est inexistant, veuillez vérifier l\'adresse web avec votre conseiller'
};

export const ERROR_FUNC_LOGIN_OR_PASSWORD: ErrorDetail  = {
  code: '409',
  description: 'Le login ou le mot de passe sont invalides'
};

export const ERROR_FUNC_OAUTH: ErrorDetail  = {
  code: '409',
  description: 'Une erreur est survenue dans la procédure de connexion, veuillez réessayer en rechargeant la page'
};
