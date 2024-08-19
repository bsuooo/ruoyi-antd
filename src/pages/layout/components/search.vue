<script setup lang="ts">
import { computed } from 'vue'
import { useAddEvent } from '@/hooks/useAddEvent'

interface Props {
  visible: boolean
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
})

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
}>()

const show = computed({
  get: () => props.visible,
  set: (val) => {
    emit('update:visible', val)
  },
})

useAddEvent(document, 'keydown', (e) => {
  const { code } = e as KeyboardEvent
  if (code === 'Escape') {
    show.value = false
  }
})
</script>

<template>
  <div v-if="show" class="search-mask h-100vh w-100vw fixed left-0 top-0 z-100 flex items-center justify-center" />
</template>

<style lang="less">
.search-mask {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(3px);
}
</style>
