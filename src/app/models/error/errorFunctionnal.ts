import { ErrorDetail } from './errorPe'

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


export const ERROR_FUNC_EXPORT_STATS: ErrorDetail  = {
    code: '405',
    description: 'Erreur lors de la récupération du fichier de statistiques'
}

export const ERROR_NOSOUND: ErrorDetail  = {
    code: '401',
    description: 'Pas de son détecté'
}

export const ERROR_UNAUTHORIZEDMICRO: ErrorDetail  = {
    code: '402',
    description: 'Inaccès au microphone'
}



export const ERROR_UNKNOWCHAT: ErrorDetail  = {
    code: '100',
    description: 'Chat inexistant'
}




