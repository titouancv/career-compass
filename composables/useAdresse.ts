import type { Lycee } from './useTypes'

/**
 * Formate l'adresse complète d'un lycée
 */
export function formatAdresse(lycee: Lycee): string {
  return `${lycee.rue}, ${lycee.code_postal} ${lycee.ville}`
}

/**
 * Formate l'adresse courte d'un lycée (sans la ville si c'est Paris)
 */
export function formatAdresseCourte(lycee: Lycee): string {
  if (lycee.ville.toLowerCase() === 'paris') {
    return `${lycee.rue}, ${lycee.code_postal}`
  }
  return formatAdresse(lycee)
}

/**
 * Recherche dans les champs d'adresse d'un lycée
 */
export function searchInAdresse(lycee: Lycee, query: string): boolean {
  const searchQuery = query.toLowerCase()
  return (
    lycee.rue.toLowerCase().includes(searchQuery) ||
    lycee.ville.toLowerCase().includes(searchQuery) ||
    lycee.code_postal.includes(searchQuery) ||
    lycee.arrondissement.toLowerCase().includes(searchQuery)
  )
}