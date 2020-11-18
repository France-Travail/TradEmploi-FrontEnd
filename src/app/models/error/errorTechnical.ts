import { ErrorDetail } from './errorPe'

export const ERROR_TECH_TRANSLATION: ErrorDetail  = {
    code: '500',
    description: 'GCT KO'
}

export const ERROR_TECH_STT: ErrorDetail  = {
    code: '501',
    description: 'STT KO'
}

export const ERROR_TECH_TTS: ErrorDetail  = {
    code: '502',
    description: 'TTS KO'
}

export const ERROR_TECH_NOSOUND: ErrorDetail  = {
    code: '502',
    description: 'Pas de son détecté'
}


export const ERROR_EXPORT: ErrorDetail  = {
    code: '500',
    description: 'Erreur lors de l\'export du fichier'
}

export const ERROR_EXPORT_STATS: ErrorDetail  = {
    code: '501',
    description: 'Export rate file KO'
}

export const ERROR_EXPORT_KPI: ErrorDetail  = {
    code: '502',
    description: 'Erreur lors de la récupération du fichier des kpis'
}

export const ERROR_DB: ErrorDetail  = {
    code: '503',
    description: 'La base de donnée est indisponible momentanément. Merci de réessayer plus tard'
}

export const ERROR_NOTATION: ErrorDetail  = {
    code: '504',
    description: 'La notation n\'a pas pu être envoyée. Redirection en cours'
}


