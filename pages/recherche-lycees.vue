<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Recherche de Lycées</h1>
        <p class="text-gray-600">Interface améliorée avec adresses décomposées</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Filtres -->
        <div class="lg:col-span-1">
          <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-lg font-semibold mb-4">Filtres de recherche</h2>
            
            <!-- Recherche par nom -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nom du lycée
              </label>
              <input
                v-model="filters.nom"
                type="text"
                placeholder="Ex: Charlemagne"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <!-- Recherche par arrondissement -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Arrondissement
              </label>
              <select
                v-model="filters.arrondissement"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tous les arrondissements</option>
                <option v-for="arr in arrondissements" :key="arr" :value="arr">
                  {{ arr }}
                </option>
              </select>
            </div>

            <!-- Recherche par code postal -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Code postal
              </label>
              <input
                v-model="filters.codePostal"
                type="text"
                placeholder="Ex: 75004"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <!-- Type -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Type d'établissement
              </label>
              <select
                v-model="filters.type"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tous les types</option>
                <option value="Public">Public</option>
                <option value="Privé">Privé</option>
                <option value="Privé sous contrat">Privé sous contrat</option>
              </select>
            </div>

            <!-- Boutons -->
            <div class="space-y-2">
              <button
                @click="applyFilters"
                class="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Rechercher
              </button>
              <button
                @click="resetFilters"
                class="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </div>

        <!-- Résultats -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow">
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-lg font-semibold">
                Résultats {{ filteredLycees.length > 0 ? `(${filteredLycees.length})` : '' }}
              </h2>
            </div>

            <div v-if="loading" class="p-8 text-center">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p class="mt-2 text-gray-600">Chargement...</p>
            </div>

            <div v-if="error" class="p-6 text-red-600">
              {{ error }}
            </div>

            <div v-if="!loading && !error" class="divide-y divide-gray-200">
              <div
                v-for="lycee in filteredLycees"
                :key="lycee.id"
                class="p-6 hover:bg-gray-50 transition-colors"
              >
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">{{ lycee.nom }}</h3>
                    <p class="text-gray-600">{{ lycee.type }}</p>
                  </div>
                  <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {{ lycee.taux_reussite_bac }}% réussite
                  </span>
                </div>

                <!-- Adresse décomposée -->
                <div class="mb-3 space-y-1">
                  <div class="flex items-center text-sm text-gray-600">
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                    <span class="font-medium">{{ lycee.rue }}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600 ml-6">
                    <span>{{ lycee.code_postal }} {{ lycee.ville }} ({{ lycee.arrondissement }})</span>
                  </div>
                </div>

                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <span>👥 {{ lycee.effectifs }} élèves</span>
                  <span>📞 {{ lycee.telephone }}</span>
                  <span>📚 {{ lycee.sections.join(', ') }}</span>
                </div>

                <div class="mt-3">
                  <details class="group">
                    <summary class="text-blue-600 cursor-pointer hover:text-blue-800">
                      Voir les spécialités ({{ lycee.specialites.length }})
                    </summary>
                    <div class="mt-2 pl-4 border-l-2 border-blue-200">
                      <div class="flex flex-wrap gap-2">
                        <span
                          v-for="specialite in lycee.specialites"
                          :key="specialite"
                          class="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm"
                        >
                          {{ specialite }}
                        </span>
                      </div>
                    </div>
                  </details>
                </div>
              </div>

              <div v-if="filteredLycees.length === 0" class="p-8 text-center text-gray-500">
                <p>Aucun lycée trouvé avec ces critères.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Lycee } from '../composables/useTypes'
import { useLycees } from '../composables/useLycees'

const { getAllLycees } = useLycees()

const lycees = ref<Lycee[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const filters = ref({
  nom: '',
  arrondissement: '',
  codePostal: '',
  type: ''
})

const arrondissements = [
  '4e', '6e', '7e', '9e', '11e', '12e', '13e', '14e', '15e', '16e', '18e', '19e', '20e'
]

const filteredLycees = computed(() => {
  let result = lycees.value

  if (filters.value.nom) {
    const nom = filters.value.nom.toLowerCase()
    result = result.filter(lycee => 
      lycee.nom.toLowerCase().includes(nom)
    )
  }

  if (filters.value.arrondissement) {
    result = result.filter(lycee => 
      lycee.arrondissement === filters.value.arrondissement
    )
  }

  if (filters.value.codePostal) {
    result = result.filter(lycee => 
      lycee.code_postal.includes(filters.value.codePostal)
    )
  }

  if (filters.value.type) {
    result = result.filter(lycee => 
      lycee.type === filters.value.type
    )
  }

  return result
})

const loadLycees = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await getAllLycees()
    if (response.success) {
      lycees.value = response.data
    }
  } catch (err) {
    error.value = 'Erreur lors du chargement des lycées'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const applyFilters = () => {
  // Les filtres sont appliqués automatiquement via computed
  console.log('Filtres appliqués:', filters.value)
}

const resetFilters = () => {
  filters.value = {
    nom: '',
    arrondissement: '',
    codePostal: '',
    type: ''
  }
}

onMounted(() => {
  loadLycees()
})
</script>