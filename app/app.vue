<template>
  <div class="min-h-screen bg-[#F7F3F0]">
    <div><img src="https://www.edumapper.com/logo.svg"></img></div>
    
    <main class="max-w-xl mx-auto px-4 pb-12">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        
        <div class="flex flex-col p-2 rounded-xl bg-white"> 
          <div class="flex justify-between w-full">
            <h3>Classes</h3>
            <div class="flex flex-inline space-x-2 items-center" @click="handleClick">
              <p v-if="!formData.classe && !formData.bacType">à compléter</p>
              <p v-else>{{ formData.classe + ", "}}{{ formData.bacType }}</p>
              <img
                src="https://cdn-icons-png.flaticon.com/512/120/120890.png"
                class="h-[12px] w-[12px] transition-transform duration-300"
                :style="{ transform: isClasseOpen ? 'rotate(180deg)' : 'rotate(0deg)' }"
              />
            </div>
          </div>
          <div v-if="isClasseOpen" class="flex flex-col gap-2">
            <div class="flex gap-2">
              <div 
              v-for="level in ['Seconde', 'Premiere', 'Terminal']" 
              :key="level"
              @click="selectClasse(level as ClasseLevel)"
              class="rounded-full p-2 cursor-pointer transition-colors"
              :class="tempData.classe === level ? 'bg-gray-900 text-white' : 'bg-gray-300 hover:bg-gray-400'"
              >
              {{ level }}
              </div>
            </div>
            <div class="h-px bg-black my-4"></div>
              <div 
              v-for="type in ['Générale', 'Technologique', 'Profesionnel']" 
              :key="type"
              @click="selectType(type as BacType)"
              class="rounded-full p-2 cursor-pointer transition-colors"
              :class="tempData.bacType === type ? 'bg-gray-900 text-white' : 'bg-gray-300 hover:bg-gray-400'"
              >
              {{ type }}
              </div>
            <button
              @click="confirmSelection"
              :disabled="!tempData.classe || !tempData.bacType"
              class="font-medium px-8 py-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              :class="tempData.classe && tempData.bacType 
              ? 'bg-gray-900 hover:bg-gray-700 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
            >
              Confirmer
            </button>
          </div>
        </div>

        <div class="flex flex-col p-2 rounded-xl bg-white"> 
          <div class="flex justify-between w-full">
            <h3>Spécialités</h3>
            <div class="flex flex-inline space-x-2 items-center">
              <p>à compléter</p>
              <img
                src="https://cdn-icons-png.flaticon.com/512/120/120890.png"
                class="h-[12px] w-[12px] transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        <div class="flex flex-col p-2 rounded-xl bg-white"> 
          <div class="flex justify-between w-full">
            <h3>Notes</h3>
            <div class="flex flex-inline space-x-2 items-center">
              <p>à compléter</p>
              <img
                src="https://cdn-icons-png.flaticon.com/512/120/120890.png"
                class="h-[12px] w-[12px] transition-transform duration-300"
              />
            </div>
          </div>
        </div>
        

        <!-- Bouton de soumission -->
        <div class="flex justify-center pt-6">
          <button
            type="submit"
            class="bg-gray-900 hover:bg-gray-700 text-white font-medium px-8 py-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Confirmer
          </button>
        </div>
      </form>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type ClasseLevel = 'Seconde' | 'Premiere' | 'Terminal'
type BacType = 'Générale' | 'Technologique' | 'Professionnel'

interface Classe {
  classe: ClasseLevel,
  type: BacType,
}

interface FormData {
  classe: ClasseLevel | null,
  bacType: BacType | null,
  speciality: string | null
  note: string | null
}

const isClasseOpen = ref(false)

const formData = ref<FormData>({
  classe: null,
  bacType: null,
  speciality: null,
  note: null,
})

const tempData = ref<FormData>({
  classe: null,
  bacType: null,
  speciality: null,
  note: null
})

const selectClasse = (level: ClasseLevel) => {
  if (tempData.value.classe === level) {
    tempData.value.classe = null
  } else {
    tempData.value.classe = level
  }
}

const selectType = (type: BacType) => {
  if (tempData.value.bacType === type) {
    tempData.value.bacType = null
  } else {
    tempData.value.bacType = type
  }
}

const confirmSelection = () => {
  formData.value.classe = tempData.value.classe
  formData.value.bacType = tempData.value.bacType
  isClasseOpen.value = false
}

const handleClick = () => {
  isClasseOpen.value = !isClasseOpen.value
}

const handleSubmit = () => {
  console.log('Données du formulaire:', formData.value)
  // Ici, vous pouvez traiter les données du formulaire
  alert('Formulaire soumis avec succès !')
}
</script>