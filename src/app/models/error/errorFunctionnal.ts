import { ErrorDetail } from './errorType'

export const ERROR_FUNC_TRANSLATION: ErrorDetail  = {
    code: '400',
    description: 'La traduction est indisponible momentanément. Merci de réessayer plus tard'
}

export const ERROR_FUNC_STT: ErrorDetail  = {
    code: '401',
    description: 'Transcription de la voix au texte est indisponible momentanément. Merci de réessayer plus tard'
}

export const ERROR_FUNC_TTS: ErrorDetail  = {
    code: '402',
    description: 'Transcription du texte à la voix est indisponible momentanément. Merci de réessayer plus tard'
}

export const ERROR_FUNC_NOSOUND: ErrorDetail  = {
    code: '403',
    description: 'Pas de son détecté'
}

export const ERROR_FUNC_EXPORT_KPI: ErrorDetail  = {
    code: '404',
    description: 'Erreur lors de la récupération du fichier des kpis. Merci de réessayer plus tard'
}

export const ERROR_FUNC_EXPORT_STATS: ErrorDetail  = {
    code: '405',
    description: 'Erreur lors de la récupération du fichier de statistiques. Merci de réessayer plus tard'
}

export const ERROR_FUNC_SEND_STATS: ErrorDetail  = {
    code: '406',
    description: 'La notation n\'a pas pu être envoyée. Redirection en cours.'
}

export const ERROR_FUNC_UNAUTHORIZEDMICRO: ErrorDetail  = {
    code: '407',
    description: 'Inaccès au microphone'
}

export const ERROR_FUNC_UNKNOWCHAT: ErrorDetail  = {
    code: '408',
    description: 'Chat inexistant'
}