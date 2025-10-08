<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">Test du sélecteur de lycée</h1>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4">Sélecteur de lycée</h2>
        
        <HighSchoolSelector 
          v-model="selectedLycee"
          @lyceeSelected="onLyceeSelected"
        />
        
        <div v-if="selectedLycee" class="mt-6 p-4 bg-green-50 border border-green-200 rounded">
          <h3 class="font-semibold text-green-800">Lycée sélectionné :</h3>
          <pre class="mt-2 text-sm text-green-700">{{ JSON.stringify(selectedLycee, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Lycee } from '~/composables/useTypes'

const selectedLycee = ref<Lycee | null>(null)

const onLyceeSelected = (lycee: Lycee) => {
  console.log('Lycée sélectionné:', lycee)
}
</script>