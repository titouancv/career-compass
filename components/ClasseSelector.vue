<template>
  <div class="flex flex-col gap-[24px]">
    <div class="flex gap-[24px]">
      <div 
        v-for="level in classeOptions" 
        :key="level"
        @click="selectClasse(level)"
        class="rounded-full px-[16px] py-[8px] cursor-pointer transition-colors"
        :class="tempData.classe === level ? 'bg-transparent border border-black text-black' : 'bg-[#F5F5F5] hover:bg-gray-400'"
      >
        {{ level }}
      </div>
    </div>
    <div class="h-px bg-[#E0E0E0] my-4"></div>
    <p>Type de bac</p>
    <div class="flex gap-2">
    <div 
      v-for="type in bacTypeOptions" 
      :key="type"
      @click="selectType(type as BacType)"
      class="rounded-full px-[16px] py-[8px] cursor-pointer transition-colors"
      :class="tempData.bacType === type ? 'bg-transparent  border border-black text-black' : 'bg-[#F5F5F5] hover:bg-gray-400'"
    >
      {{ type }}
    </div>
    </div>
    <AppButton
      :disabled="!tempData.classe || !tempData.bacType"
      @click="confirmSelection"
    >
      Confirmer
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { ClasseLevel, BacType, ClasseData } from '../composables/useTypes'
import AppButton from './AppButton.vue'

interface Props {
  modelValue: ClasseData
  availableSections?: BacType[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: ClasseData]
  'confirm': []
}>()

const classeOptions: ClasseLevel[] = ['Seconde', 'Première', 'Terminal']
const bacTypeOptions = computed(() => {
  return props.availableSections || ['Générale', 'Technologique', 'Professionnelle']
})

const tempData = ref<ClasseData>({
  classe: null,
  bacType: null
})

// Réinitialiser les données temporaires si les sections disponibles changent
watch(
  () => props.availableSections,
  (newSections) => {
    if (newSections && tempData.value.bacType && !newSections.includes(tempData.value.bacType)) {
      tempData.value.bacType = null
      emit('update:modelValue', { ...tempData.value })
    }
  }
)

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
  emit('update:modelValue', { ...tempData.value })
  emit('confirm')
}
</script>