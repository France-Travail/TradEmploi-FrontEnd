import { ErrorDetail } from './errorPe'

export const ERROR_NOSOUND: ErrorDetail  = {
    code: '401',
    description: 'Pas de son détecté'
}

export const ERROR_UNAUTHORIZEDMICRO: ErrorDetail  = {
    code: '402',
    description: 'Inaccès au microphone'
}

export const ERROR_TRANSLATIONUNAVAILABLE: ErrorDetail  = {
    code: '403',
    description: 'Traduction de la voix au texte est indisponible momentanément. Merci de réessayer plus tard'
}

export const ERROR_STOTERROR: ErrorDetail  = {
    code: '404',
    description: 'Transcription de la voix au texte est indisponible momentanément. Merci de réessayer plus tard'
}

export const ERROR_UNKNOWCHAT: ErrorDetail  = {
    code: '100',
    description: 'Chat inexistant'
}
