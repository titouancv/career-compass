<template>
  <div class="min-h-screen bg-[#F7F3F0]">
    <AppHeader />
    
    <main class="max-w-xl mx-auto px-4 pb-12">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        
        <!-- Classes Section -->
        <FormSection 
          title="Classes" 
          :is-open="isClasseOpen"
          :status-text="classeStatusText"
          @toggle="toggleClasseSection"
        >
          <ClasseSelector 
            v-model="classeData"
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
import type { FormData, ClasseData } from '../composables/useTypes'
import AppHeader from '../components/AppHeader.vue'
import AppButton from '../components/AppButton.vue'
import FormSection from '../components/FormSection.vue'
import ClasseSelector from '../components/ClasseSelector.vue'
import SpecialitySelector from '../components/SpecialitySelector.vue'
import GradeSelector from '../components/GradeSelector.vue'

const isClasseOpen = ref(false)

const formData = ref<FormData>({
  classe: null,
  bacType: null,
  speciality: null,
  note: null,
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

const handleSubmit = () => {
  console.log('Données du formulaire:', formData.value)
  alert('Formulaire soumis avec succès !')
}
</script>