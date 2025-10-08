<template>
  <div class="flex flex-col p-[20px] gap-[24px] rounded-xl bg-white">
    <div class="flex justify-between w-full">
      <h3 class="font-bold">{{ title }}</h3>
      <div class="flex flex-inline space-x-2 items-center" @click="toggleSection">
        <p v-if="!isOpen" class="text-[#757575]">{{ statusText }}</p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/120/120890.png"
          class="h-[12px] w-[12px] transition-transform duration-300"
          :style="{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }"
        />
      </div>
    </div>
    <div v-if="isOpen">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  isOpen: boolean
  statusText?: string
}

const props = withDefaults(defineProps<Props>(), {
  statusText: 'à compléter'
})

const emit = defineEmits<{
  toggle: []
}>()

const toggleSection = () => {
  emit('toggle')
}
</script>