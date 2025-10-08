<template>
  <div class="min-h-screen bg-[#F7F3F0]">
    <AppHeader />
    
    <main class="max-w-xl mx-auto px-4 pb-12">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        
        <HighSchoolSelector 
          v-model="formData.lycee"
          @lyceeSelected="onLyceeSelected"
        />
        <!-- Classes Section -->
        <FormSection 
          title="Classes" 
          :is-open="isClasseOpen"
          :status-text="classeStatusText"
          @toggle="toggleClasseSection"
        >
          <ClasseSelector 
            v-model="classeData"
            :available-sections="formData.lycee?.sections"
            @confirm="onClasseConfirm"
          />
        </FormSection>

        <!-- Spécialités Section -->
        <FormSection 
          title="Spécialités" 
          :is-open="false"
        >
          <SpecialitySelector />
        </FormSection>

        <!-- Notes Section -->
        <FormSection 
          title="Notes" 
          :is-open="false"
        >
          <GradeSelector />
        </FormSection>
        
        <!-- Submit Button -->
        <div class="flex justify-center pt-6">
          <AppButton
          :disabled="!formData.classe || !formData.bacType || !formData.lycee"
            type="submit"
          >
            Confirmer
          </AppButton>
        </div>
      </form>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { FormData, ClasseData, Lycee } from '../composables/useTypes'
import AppHeader from '../components/AppHeader.vue'
import AppButton from '../components/AppButton.vue'
import FormSection from '../components/FormSection.vue'
import ClasseSelector from '../components/ClasseSelector.vue'
import SpecialitySelector from '../components/SpecialitySelector.vue'
import GradeSelector from '../components/GradeSelector.vue'
import HighSchoolSelector from '../components/HighSchoolSelector.vue'

const isClasseOpen = ref(false)

const formData = ref<FormData>({
  classe: null,
  bacType: null,
  speciality: null,
  note: null,
  lycee: null
})

const classeData = ref<ClasseData>({
  classe: null,
  bacType: null
})

const classeStatusText = computed(() => {
  if (!formData.value.classe && !formData.value.bacType) {
    return 'à compléter'
  }
  return `${formData.value.classe}, ${formData.value.bacType}`
})

const toggleClasseSection = () => {
  isClasseOpen.value = !isClasseOpen.value
}

const onClasseConfirm = () => {
  formData.value.classe = classeData.value.classe
  formData.value.bacType = classeData.value.bacType
  isClasseOpen.value = false
}

const onLyceeSelected = (lycee: Lycee) => {
  formData.value.lycee = lycee
  
  // Réinitialiser classeData quand un nouveau lycée est sélectionné
  // si le bacType actuel n'est pas disponible dans les sections du nouveau lycée
  if (classeData.value.bacType && !lycee.sections.includes(classeData.value.bacType)) {
    classeData.value.bacType = null
    formData.value.bacType = null
    classeData.value.classe = null
    formData.value.classe = null
  }
  
  console.log('Lycée sélectionné:', lycee)
  console.log('Sections disponibles:', lycee.sections)
}

const handleSubmit = () => {
  console.log('Données du formulaire:', formData.value)
  
  // Vérification des données requises
  if (!formData.value.lycee) {
    alert('Veuillez sélectionner un lycée')
    return
  }
  
  if (!formData.value.classe || !formData.value.bacType) {
    alert('Veuillez compléter les informations de classe')
    return
  }
  
  alert(`Formulaire soumis avec succès !\nLycée: ${formData.value.lycee.nom}\nClasse: ${formData.value.classe}, ${formData.value.bacType}`)
}
</script>