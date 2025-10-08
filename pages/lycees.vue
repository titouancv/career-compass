<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Lycées de Paris</h1>
        <p class="text-gray-600">Découvrez les lycées parisiens et leurs spécialités</p>
      </div>

      <!-- Test de l'API -->
      <div class="mb-8 p-4 bg-white rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Test de l'API</h2>
        <div class="flex space-x-4 mb-4">
          <button
            @click="testGetAllLycees"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Charger tous les lycées
          </button>
          <button
            @click="testGetLyceeById"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Charger lycée #1
          </button>
          <button
            @click="testSearchLycees"
            class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Rechercher lycées publics
          </button>
        </div>
        
        <div v-if="apiLoading" class="text-blue-600">Chargement...</div>
        <div v-if="apiError" class="text-red-600">Erreur: {{ apiError }}</div>
        <div v-if="apiResult" class="mt-4">
          <h3 class="font-semibold mb-2">Résultat:</h3>
          <pre class="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">{{ JSON.stringify(apiResult, null, 2) }}</pre>
        </div>
      </div>

      <!-- Liste des lycées simplifiée -->
      <div class="grid gap-6">
        <div
          v-for="lycee in displayedLycees"
          :key="lycee.id"
          class="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-xl font-semibold text-gray-900">{{ lycee.nom }}</h3>
              <p class="text-gray-600">{{ lycee.type }} - {{ lycee.arrondissement }}</p>
            </div>
            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {{ lycee.taux_reussite_bac }}% réussite
            </span>
          </div>
          
          <p class="text-gray-700 mb-3">{{ formatAdresse(lycee) }}</p>
          
          <div class="mb-4">
            <h4 class="font-medium text-gray-900 mb-2">Sections:</h4>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="section in lycee.sections"
                :key="section"
                class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
              >
                {{ section }}
              </span>
            </div>
          </div>
          
          <div>
            <h4 class="font-medium text-gray-900 mb-2">Spécialités ({{ lycee.specialites.length }}):</h4>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="specialite in lycee.specialites.slice(0, 4)"
                :key="specialite"
                class="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm"
              >
                {{ specialite }}
              </span>
              <span
                v-if="lycee.specialites.length > 4"
                class="px-2 py-1 bg-gray-50 text-gray-600 rounded text-sm"
              >
                +{{ lycee.specialites.length - 4 }} autres
              </span>
            </div>
          </div>
          
          <div class="mt-4 pt-4 border-t flex justify-between items-center">
            <div class="text-sm text-gray-500">
              <span>👥 {{ lycee.effectifs }} élèves</span>
              <span class="mx-2">•</span>
              <span>📞 {{ lycee.telephone }}</span>
            </div>
            <a
              :href="lycee.site_web"
              target="_blank"
              class="text-blue-600 hover:text-blue-800 text-sm"
            >
              Site web →
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Lycee } from '~/composables/useTypes'
import { formatAdresse } from '~/composables/useAdresse'

const displayedLycees = ref<Lycee[]>([])
const apiLoading = ref(false)
const apiError = ref<string | null>(null)
const apiResult = ref<any>(null)

// Test des différentes endpoints
const testGetAllLycees = async () => {
  apiLoading.value = true
  apiError.value = null
  apiResult.value = null
  
  try {
    const response = await fetch('/api/lycees')
    const result = await response.json() as {success: boolean, data: Lycee[]}
    apiResult.value = result
    if (result && result.data) {
      displayedLycees.value = result.data
    }
  } catch (error) {
    apiError.value = 'Erreur lors du chargement des lycées'
    console.error(error)
  } finally {
    apiLoading.value = false
  }
}

const testGetLyceeById = async () => {
  apiLoading.value = true
  apiError.value = null
  apiResult.value = null
  
  try {
    const response = await fetch('/api/lycees/1')
    const result = await response.json()
    apiResult.value = result
  } catch (error) {
    apiError.value = 'Erreur lors du chargement du lycée'
    console.error(error)
  } finally {
    apiLoading.value = false
  }
}

const testSearchLycees = async () => {
  apiLoading.value = true
  apiError.value = null
  apiResult.value = null
  
  try {
    const response = await fetch('/api/lycees/search?type=Public')
    const result = await response.json() as {success: boolean, data: Lycee[]}
    apiResult.value = result
    if (result && result.data) {
      displayedLycees.value = result.data
    }
  } catch (error) {
    apiError.value = 'Erreur lors de la recherche'
    console.error(error)
  } finally {
    apiLoading.value = false
  }
}

// Charger les lycées au montage du composant
onMounted(() => {
  testGetAllLycees()
})
</script>