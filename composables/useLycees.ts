import { ref, readonly } from 'vue'
import type { Lycee } from './useTypes'

interface LyceeSearchParams {
  nom?: string
  type?: string
  arrondissement?: string
  specialite?: string
  section?: string
  taux_min?: string
}

interface ApiResponse<T> {
  success: boolean
  data: T
  total?: number
  filters?: LyceeSearchParams
}

type LyceesResponse = ApiResponse<Lycee[]>
type LyceeResponse = ApiResponse<Lycee>

export const useLycees = () => {
  // Récupérer tous les lycées
  const getAllLycees = async (): Promise<LyceesResponse> => {
    try {
      const response = await fetch('/api/lycees')
      const data = await response.json() as LyceesResponse
      return data
    } catch (error) {
      console.error('Erreur lors de la récupération des lycées:', error)
      throw error
    }
  }

  // Récupérer un lycée par son ID
  const getLyceeById = async (id: number): Promise<LyceeResponse> => {
    try {
      const response = await fetch(`/api/lycees/${id}`)
      const data = await response.json() as LyceeResponse
      return data
    } catch (error) {
      console.error(`Erreur lors de la récupération du lycée ${id}:`, error)
      throw error
    }
  }

  // Rechercher des lycées avec des filtres
  const searchLycees = async (params: LyceeSearchParams): Promise<LyceesResponse> => {
    try {
      const query = new URLSearchParams()
      
      Object.entries(params).forEach(([key, value]) => {
        if (value && typeof value === 'string') {
          query.append(key, value)
        }
      })

      const response = await fetch(`/api/lycees/search?${query.toString()}`)
      const data = await response.json() as LyceesResponse
      return data
    } catch (error) {
      console.error('Erreur lors de la recherche de lycées:', error)
      throw error
    }
  }

  // État réactif pour les lycées
  const lycees = ref<Lycee[]>([])
  const selectedLycee = ref<Lycee | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Charger tous les lycées
  const loadLycees = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await getAllLycees()
      lycees.value = response.data
    } catch (err) {
      error.value = 'Erreur lors du chargement des lycées'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Charger un lycée spécifique
  const loadLycee = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const response = await getLyceeById(id)
      selectedLycee.value = response.data
    } catch (err) {
      error.value = 'Erreur lors du chargement du lycée'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Rechercher des lycées
  const searchLyceesWithFilters = async (filters: LyceeSearchParams) => {
    loading.value = true
    error.value = null
    try {
      const response = await searchLycees(filters)
      lycees.value = response.data
      return response
    } catch (err) {
      error.value = 'Erreur lors de la recherche'
      console.error(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Filtres disponibles
  const getAvailableTypes = () => {
    return ['Public', 'Privé', 'Privé sous contrat']
  }

  const getAvailableArrondissements = () => {
    return [
      '4e', '6e', '7e', '9e', '11e', '12e', '13e', '14e', '15e', '16e', '18e', '19e', '20e'
    ]
  }

  const getAvailableSections = () => {
    return ['Générale', 'Technologique', 'Professionnelle']
  }

  return {
    // Méthodes API
    getAllLycees,
    getLyceeById,
    searchLycees,
    
    // État réactif
    lycees: readonly(lycees),
    selectedLycee: readonly(selectedLycee),
    loading: readonly(loading),
    error: readonly(error),
    
    // Méthodes utilitaires
    loadLycees,
    loadLycee,
    searchLyceesWithFilters,
    
    // Filtres
    getAvailableTypes,
    getAvailableArrondissements,
    getAvailableSections
  }
}