<script setup lang="ts">
import menuItem from './menuItem.vue'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useSystemStore } from '@/store/system/index'
import { useMenuStore } from '@/store/menu'

const { collapsed, menuTheme, logoBgColor, logoFtColor, showRightLogo }
  = storeToRefs(useSystemStore())
const { menu } = storeToRefs(useMenuStore())

const leftWidth = computed(() => {
  return collapsed.value ? '50px' : '220px'
})

const menuHeight = computed(() => {
  return showRightLogo.value ? `calc(100vh - 50px)` : `100vh`
})

const allMenu = computed(() => {
  const homeMenu = [
    {
      path: '/home',
      component: 'Layout',
      alwaysShow: false,
      redirect: '/home/index',
      meta: {
        title: '首页',
        icon: 'home',
      },
    },
  ]
  return [...homeMenu, ...menu.value]
})
</script>

<template>
  <div class="position-fixed left-0">
    <div
      v-show="showRightLogo"
      key="logo"
      class="h-50px flex flex-items-center flex-justify-center logo"
    >
      <img src="/src/assets/img/logo.png" alt="" width="32" height="32">
      <span v-if="!collapsed">若依管理系统</span>
    </div>
    <a-menu
      id="dddddd"
      class="page-menu"
      mode="inline"
      :inline-collapsed="collapsed"
      :theme="menuTheme"
    >
      <menuItem v-for="m of allMenu" :key="m.path" :menu="m" />
    </a-menu>
  </div>
</template>

<style lang="less" scoped>
.page-menu {
  width: v-bind(leftWidth);
  height: v-bind(menuHeight);
  overflow-y: auto;
  transition: all 0.5s;
}
.logo {
  width: v-bind(leftWidth);
  transition: all 0.5s;
  background-color: v-bind(logoBgColor);
  color: v-bind(logoFtColor);
}
</style>
