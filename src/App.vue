<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { effect } from 'vue'
import { theme } from 'ant-design-vue'
import { useSystemStore } from '@/store/system/index'

const { showDynamicTitle, primaryColor, dark, currentRouteTitle, defaultTitle } = storeToRefs(useSystemStore())

effect(() => {
  if (showDynamicTitle.value) {
    document.title = `${defaultTitle?.value} - ${currentRouteTitle?.value}`
    return
  }
  document.title = defaultTitle?.value
})
</script>

<template>
  <a-config-provider
    :theme="{
      token: { colorPrimary: primaryColor },
      algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }"
  >
    <router-view />
  </a-config-provider>
</template>

<style scoped></style>
