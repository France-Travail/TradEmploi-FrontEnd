export enum ErrorCodes {
  NOSOUNDERROR = 'Pas de son détecté',
  UNAUTHORIZEDMICRO = 'Inaccès au microphone',
  TRANSLATIONUNAVAILABLE = 'Traduction de la voix au texte est indisponible momentanément. Merci de réessayer plus tard.',
  NONEXISTANTCHAT = 'Chat inexistant',
  EXPORTERROR = 'Erreur lors de l\'export du fichier',
  KPIERROR = 'Erreur lors de la récupération de la clef des statistiques',
  KPICALLERROR = 'Erreur lors de la récupération des statistiques',
  DBERROR = 'La base de donnée est indisponible momentanément. Merci de réessayer plus tard.',
  NOTATIONERROR = 'La notation n\'a pas pu être envoyée. Redirection en cours.',
  HISTORICERROR = 'Une erreur a eu lieu. Merci de réessayer plus tard.',
  STOTERROR = 'Transcription de la voix au texte est indisponible momentanément. Merci de réessayer plus tard.'
}
