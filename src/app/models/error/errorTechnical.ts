import { ErrorDetail } from './errorPe'

export const ERROR_EXPORT: ErrorDetail  = {
    code: '500',
    description: 'Erreur lors de l\'export du fichier'
}

export const ERROR_EXPORT_STATS: ErrorDetail  = {
    code: '501',
    description: 'Erreur lors de la récupération du fichier de statistiques'
}

export const ERROR_EXPORT_KPI: ErrorDetail  = {
    code: '501',
    description: 'Erreur lors de la récupération du fichier des kpis'
}

export const ERROR_DB: ErrorDetail  = {
    code: '502',
    description: 'La base de donnée est indisponible momentanément. Merci de réessayer plus tard'
}

export const ERROR_NOTATION: ErrorDetail  = {
    code: '503',
    description: 'La notation n\'a pas pu être envoyée. Redirection en cours'
}

export const ERROR_TRANSLATION_API: ErrorDetail  = {
    code: '505',
    description: 'API Translate KO'
}

export const ERROR_STT_API: ErrorDetail  = {
    code: '506',
    description: 'API STT KO'
}

export const ERROR_TTS_API: ErrorDetail  = {
    code: '507',
    description: 'API TTS KO'
}