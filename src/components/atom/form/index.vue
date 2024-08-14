<script setup lang="ts" name="vvForm">
import vForm from '@/components/atom/form/components/form.vue'
import vFormItem from '@/components/atom/form/components/formItem.vue'

defineProps({
  model: {
    type: Object,
    default: () => {},
  },
  config: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <v-form :model="model">
    <v-form-item>
      <component is="aInput" />
    </v-form-item>
  </v-form>
</template>
