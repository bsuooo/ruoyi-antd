<script setup lang="ts">
import menuItem from './MenuItem.vue'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useSystemStore } from '@/store/system/index'
import { useMenuStore } from '@/store/menu'

const { state, logoBgColor, logoFtColor }
  = storeToRefs(useSystemStore())
const { menu } = storeToRefs(useMenuStore())

const leftWidth = computed(() => {
  return state.value.collapsed ? '50px' : '220px'
})

const menuHeight = computed(() => {
  return state.value.showRightLogo ? `calc(100vh - 50px)` : `100vh`
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

const route = useRoute()
const router = useRouter()
const selectedKeys = computed(() => {
  return [route.path]
})
</script>

<template>
  <div class="position-fixed left-0">
    <div
      v-show="state.showRightLogo"
      key="logo"
      class="h-50px flex flex-items-center flex-justify-center logo cursor-pointer"
      @click="router.push('/home')"
    >
      <img src="/src/assets/img/logo.png" alt="" width="32" height="32">
      <span v-if="!state.collapsed">若依管理系统</span>
    </div>
    <a-menu
      id="dddddd"
      class="page-menu"
      mode="inline"
      :selected-keys="selectedKeys"
      :inline-collapsed="state.collapsed"
      :theme="state.menuTheme"
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
