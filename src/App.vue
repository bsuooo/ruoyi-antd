<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { effect } from 'vue'
import { theme } from 'ant-design-vue'
import { useSystemStore } from '@/store/system/index'
import { useTagStore } from '@/store/tag/index'

const { showDynamicTitle, primaryColor, dark } = storeToRefs(useSystemStore())
const { currentRouteTitle } = storeToRefs(useTagStore())
const { defaultTitle } = useTagStore()

effect(() => {
  if (showDynamicTitle.value) {
    document.title = `${defaultTitle} - ${currentRouteTitle.value}`
    return
  }
  document.title = defaultTitle
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
