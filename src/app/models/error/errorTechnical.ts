import { ErrorDetail } from './errorType';

export const ERROR_TECH_TRANSLATION: ErrorDetail  = {
    code: '500',
    description: 'GCT KO'
};

export const ERROR_TECH_STT: ErrorDetail  = {
    code: '501',
    description: 'STT KO'
};

export const ERROR_TECH_GET_VOICE: ErrorDetail  = {
    code: '502',
    description: 'GET VOICE LIST KO'
};

export const ERROR_TECH_TTS: ErrorDetail  = {
    code: '503',
    description: 'TTS KO'
};

export const ERROR_TECH_EXPORT_KPI: ErrorDetail  = {
    code: '504',
    description: 'Export kpi file KO'
};

export const ERROR_TECH_EXPORT_STATS: ErrorDetail  = {
    code: '505',
    description: 'Export rate file KO'
};

export const ERROR_TECH_EXPORT_TOKEN: ErrorDetail  = {
    code: '506',
    description: 'Token KO'
};

export const ERROR_TECH_DB: ErrorDetail  = {
    code: '507',
    description: 'La base de donnée est indisponible momentanément. Merci de réessayer plus tard'
};

export const ERROR_NOTATION: ErrorDetail  = {
    code: '508',
    description: 'La notation n\'a pas pu être envoyée. Redirection en cours'
};


