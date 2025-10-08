<template>
  <button
    :type="type"
    :disabled="disabled"
    class="font-medium px-[24px] py-[16px] rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
    :class="computedClasses"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'button' | 'submit'
  disabled?: boolean
  variant?: 'primary' | 'secondary'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  disabled: false,
  variant: 'primary'
})

defineEmits<{
  click: []
}>()

const computedClasses = computed(() => {
  if (props.disabled) {
    return 'bg-white border border-[#E0E0E0] text-gray-500 cursor-not-allowed'
  }
  
  if (props.variant === 'primary') {
    return 'bg-gray-900 hover:bg-gray-700 text-white'
  }
  
  return 'bg-gray-300 hover:bg-gray-400 text-gray-900'
})
</script>