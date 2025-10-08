<template>
  <div class="min-h-screen bg-[#F7F3F0]">
    <div><img src="https://www.edumapper.com/logo.svg"></img></div>
    
    <main class="max-w-xl mx-auto px-4 pb-12">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        
        <div class="flex flex-col p-2 rounded-xl bg-white"> 
          <div class="flex justify-between w-full">
            <h3>Classes</h3>
          </div>
        </div>
        

        <!-- Bouton de soumission -->
        <div class="flex justify-center pt-6">
          <button
            type="submit"
            class="bg-gray-900 hover:bg-gray-700 text-white font-medium px-8 py-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Confirmer et continuer
          </button>
        </div>
      </form>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type ClasseLevel = 'Seconde' | 'premiere' | 'terminal'
type BacType = 'Général' | 'Technologique' | 'Professionel'

interface Classe {
  classe: ClasseLevel,
  type: BacType,
}

interface FormData {
  classe: Classe | null
  speciality: string | null
  note: string | null
}

const isClasseOpen = ref(false)

const formData = ref<FormData>({
  classe: null,
  speciality: null,
  note: null,
})

const handleClick = () => {
  isClasseOpen.value = !isClasseOpen.value
}

const handleSubmit = () => {
  console.log('Données du formulaire:', formData.value)
  // Ici, vous pouvez traiter les données du formulaire
  alert('Formulaire soumis avec succès !')
}
</script>