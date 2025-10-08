<template>
  <div class="space-y-4">
    <!-- Lycée sélectionné - Style comme l'image -->
    <div v-if="selectedLycee && !isSelecting" class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 p-6 text-white shadow-lg">
      <!-- Contenu principal -->
      <div class="relative z-10">
        <h3 class="text-2xl font-bold mb-2">{{ selectedLycee.nom }}</h3>
        
        <div class="flex items-center space-x-4 mb-6">
          <div class="flex items-center space-x-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
            <span class="text-white/90">{{ selectedLycee.ville }}</span>
          </div>
          
          <div class="flex items-center space-x-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-white/90">{{ selectedLycee.type }}</span>
          </div>
        </div>
        
        <!-- Bouton Modifier -->
        <button
          @click="openLyceeSelection"
          class="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full font-medium hover:bg-white/30 transition-all duration-200"
        >
          Modifier
        </button>
      </div>
      
      <!-- Élément décoratif -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
      <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
    </div>

    <!-- Placeholder quand aucun lycée n'est sélectionné -->
    <div v-if="!selectedLycee && !isSelecting" class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 p-6 text-white shadow-lg cursor-pointer" @click="openLyceeSelection">
      <!-- Contenu principal -->
      <div class="relative z-10">
        <h3 class="text-2xl font-bold mb-2">Choisir un lycée</h3>
        
        <div class="flex items-center space-x-4 mb-6">
          <div class="flex items-center space-x-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
            <span class="text-white/90">Ville</span>
          </div>
          
          <div class="flex items-center space-x-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-white/90">Type de lycée</span>
          </div>
        </div>
        
        <!-- Bouton -->
        <button class="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full font-medium hover:bg-white/30 transition-all duration-200">
          Choisir
        </button>
      </div>
      
      <!-- Élément décoratif -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
      <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
    </div>
    <div v-if="!selectedLycee || isSelecting" class="bg-white rounded-xl border border-gray-200 shadow-sm">
      <!-- En-tête avec recherche -->
      <div class="p-4 border-b border-gray-200">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ selectedLycee ? 'Changer de lycée' : 'Choisir votre lycée' }}
          </h3>
          <AppButton
            v-if="selectedLycee"
            variant="secondary"
            @click="cancelSelection"
            size="sm"
          >
            Annuler
          </AppButton>
        </div>
        
        <!-- Barre de recherche -->
        <div class="relative mb-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher un lycée par nom, arrondissement..."
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <!-- Filtres rapides -->
        <div>
          <p class="text-sm font-medium text-gray-700 mb-2">Filtrer par type :</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="type in ['Tous', 'Public', 'Privé', 'Privé sous contrat']"
              :key="type"
              @click="setTypeFilter(type)"
              class="px-3 py-1 rounded-full text-sm transition-colors"
              :class="activeTypeFilter === type 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            >
              {{ type }}
            </button>
          </div>
        </div>
      </div>

      <!-- État de chargement -->
      <div v-if="loading" class="p-8 text-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p class="mt-2 text-gray-600">Chargement des lycées...</p>
      </div>

      <!-- Erreur -->
      <div v-if="error" class="p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
        {{ error }}
      </div>

      <!-- Liste des lycées -->
      <div v-if="!loading && !error" class="max-h-96 overflow-y-auto">
        <div
          v-for="lycee in filteredLycees"
          :key="lycee.id"
          @click="selectLycee(lycee)"
          class="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
          :class="{ 'bg-blue-50 border-blue-200': selectedLycee?.id === lycee.id }"
        >
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <h4 class="font-medium text-gray-900">{{ lycee.nom }}</h4>
              <p class="text-sm text-gray-600 mt-1">{{ lycee.arrondissement }} • {{ formatAdresse(lycee) }}</p>
              <div class="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span>👥 {{ lycee.effectifs }}</span>
                <span>🎓 {{ lycee.taux_reussite_bac }}%</span>
                <span>📚 {{ lycee.sections.join(', ') }}</span>
              </div>
            </div>
            <div class="ml-4 text-right">
              <span 
                class="px-2 py-1 rounded-full text-xs font-medium"
                :class="getTypeColor(lycee.type)"
              >
                {{ lycee.type }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Message si aucun résultat -->
        <div v-if="filteredLycees.length === 0" class="p-8 text-center text-gray-500">
          <p>Aucun lycée trouvé pour votre recherche.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { Lycee } from '../composables/useTypes'
import { formatAdresse, searchInAdresse } from '../composables/useAdresse'
import AppButton from './AppButton.vue'

interface Props {
  modelValue?: Lycee | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [lycee: Lycee | null]
  'lyceeSelected': [lycee: Lycee]
}>()

const selectedLycee = ref<Lycee | null>(props.modelValue || null)
const isSelecting = ref(!props.modelValue)
const searchQuery = ref('')
const activeTypeFilter = ref('Tous')
const loading = ref(false)
const error = ref<string | null>(null)
const allLycees = ref<Lycee[]>([])

// Charger les lycées depuis l'API
const loadLycees = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch('/api/lycees')
    const data = await response.json() as {success: boolean, data: Lycee[]}
    if (data.success) {
      allLycees.value = data.data
    }
  } catch (err) {
    error.value = 'Erreur lors du chargement des lycées'
    console.error('Erreur API:', err)
  } finally {
    loading.value = false
  }
}

// Lycées filtrés
const filteredLycees = computed(() => {
  let lycees = allLycees.value

  // Filtre par type
  if (activeTypeFilter.value !== 'Tous') {
    lycees = lycees.filter(lycee => lycee.type === activeTypeFilter.value)
  }

  // Filtre par recherche
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    lycees = lycees.filter(lycee => 
      lycee.nom.toLowerCase().includes(query) ||
      lycee.arrondissement.toLowerCase().includes(query) ||
      searchInAdresse(lycee, query)
    )
  }

  return lycees
})

// Actions
const openLyceeSelection = () => {
  isSelecting.value = true
}

const cancelSelection = () => {
  isSelecting.value = false
  searchQuery.value = ''
  activeTypeFilter.value = 'Tous'
}

const selectLycee = (lycee: Lycee) => {
  selectedLycee.value = lycee
  isSelecting.value = false
  searchQuery.value = ''
  activeTypeFilter.value = 'Tous'
  
  emit('update:modelValue', lycee)
  emit('lyceeSelected', lycee)
}

const setTypeFilter = (type: string) => {
  activeTypeFilter.value = type
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Public':
      return 'bg-green-100 text-green-800'
    case 'Privé':
      return 'bg-purple-100 text-purple-800'
    case 'Privé sous contrat':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Watchers
watch(() => props.modelValue, (newValue) => {
  if (newValue !== undefined) {
    selectedLycee.value = newValue
    if (newValue) {
      isSelecting.value = false
    }
  }
})

// Lifecycle
onMounted(() => {
  loadLycees()
})
</script>