<script setup lang="ts" name="layout">
import tagList from './components/tagList.vue'
import pageMenu from './components/pageMenu.vue'
import systemConfig from './components/systemConfig.vue'
import search from './components/search.vue'
import {
  DownOutlined,
} from '@ant-design/icons-vue'
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { useSystemStore } from '@/store/system/index'
import { removeToken } from '@/utils/system'
import { useUserStore } from '@/store/user'
import { useScreenFull } from '@/hooks/useScreenFull'
import { useTagStore } from '@/store/tag'

const { collapsed, showTagsView, dark } = storeToRefs(useSystemStore())

const { cacheTags } = storeToRefs(useTagStore())

const leftWidth = computed(() => {
  return collapsed.value ? '50px' : '220px'
})

function goGithub() {
  window.open('https://github.com/bsuooo/ruoyi-antd')
}

function goDocument() {
  window.open('http://doc.ruoyi.vip/ruoyi-vue/')
}

const searchVisible = ref(false)
function handleSearch() {
  searchVisible.value = true
}

const { changeScreenfull, isScreenfull } = useScreenFull()

const router = useRouter()
const { userInfo, roles, permissions } = storeToRefs(useUserStore())
function logout() {
  router.push('/login')
  removeToken()
  userInfo.value = null
  roles.value = []
  permissions.value = []
  message.success('已退出登录！')
}

const isAppearanceTransition
  // @ts-expect-error: Transition API
  = document.startViewTransition
  && !window.matchMedia(`(prefers-reduced-motion: reduce)`).matches

function changeDark(event: MouseEvent) {
  if (!isAppearanceTransition) {
    document.documentElement.className = dark.value ? 'light' : 'dark'
    dark.value = !dark.value
    return
  }
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )

  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(() => {
    document.documentElement.className = dark.value ? 'light' : 'dark'
    dark.value = !dark.value
  })
  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: dark.value ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 300,
        easing: 'ease-in',
        pseudoElement: dark.value
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
  })
}
</script>

<template>
  <pageMenu />
  <div class="position-relative right-container flex h-100% flex-col">
    <div class="h-50px flex items-center justify-between">
      <div class="navbar-left ml-10px">
        <span v-if="collapsed" class="i-line-md:menu-fold-right cursor-pointer" @click="collapsed = !collapsed" />
        <span v-else class="i-line-md:menu-fold-left cursor-pointer" @click="collapsed = !collapsed" />
      </div>
      <div class="navbar-right flex items-center">
        <span class="i-ic:round-search ml-15px font-size-22px cursor-pointer" @click="handleSearch" />
        <span class="i-ri:github-fill ml-15px font-size-22px cursor-pointer" @click="goGithub" />
        <span class="i-solar:document-broken ml-15px font-size-22px cursor-pointer" @click="goDocument" />
        <span v-if="!isScreenfull" class="i-mingcute:fullscreen-2-line ml-15px font-size-22px cursor-pointer" @click="changeScreenfull" />
        <span v-else class="i-mingcute:fullscreen-exit-2-fill ml-15px font-size-22px cursor-pointer" @click="changeScreenfull" />
        <span v-if="dark" class="i-ph:sun-bold ml-15px font-size-22px cursor-pointer" @click="changeDark" />
        <span v-else class="i-ph:moon-duotone ml-15px font-size-22px cursor-pointer" @click="changeDark" />
        <a-dropdown>
          <a class="ant-dropdown-link ml-15px mr-15px" @click.prevent>
            管理员
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <systemConfig />
              <a-menu-item>
                <a href="javascript:;" @click="logout">退出登录</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <tagList v-show="showTagsView" />
    <div class="main flex-1 bg-pure p-16px">
      <router-view v-slot="{ Component }">
        <keep-alive :include="cacheTags">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
    <search v-model:visible="searchVisible" />
  </div>
</template>

<style lang="less">
.right-container {
  margin-left: v-bind(leftWidth);
  transition: all 0.5s;
}
</style>
