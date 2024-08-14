<script setup lang="ts" name="menuItem">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import type { Route } from '@/pages/login/types'
import { useSystemStore } from '@/store/system'
import { isUrl } from '@/utils/isUrl'

interface MenuProps {
  menu: any
}

defineProps<MenuProps>()

const { logoFtColor } = storeToRefs(useSystemStore())

const router = useRouter()
function go(menu: Route) {
  const { path } = menu
  if (isUrl(path)) {
    window.open(path)
  }
  else {
    router.push(path)
  }
}
</script>

<template>
  <a-sub-menu v-if="menu.alwaysShow" :key="menu.path">
    <template #icon>
      <svgIcon :name="menu.meta.icon" :color="logoFtColor" />
    </template>
    <template #title>
      <span :title="menu.meta.title">{{ menu.meta.title }}</span>
    </template>
    <menuItem v-for="m of menu.children" :key="m.path" :menu="m" />
  </a-sub-menu>
  <a-menu-item v-else :key="`${menu.path}`" @click="go(menu)">
    <template #icon>
      <svgIcon :name="menu.meta.icon" :color="logoFtColor" />
    </template>
    <span :title="menu.meta.title">{{ menu.meta.title }}</span>
  </a-menu-item>
</template>
