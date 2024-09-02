<script setup lang="ts" name="layout">
import tagList from './components/tagList.vue'
import pageMenu from './components/pageMenu.vue'
import systemConfig from './components/systemConfig.vue'
import search from './components/search.vue'
import {
  DownOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue'
import { computed, h, ref, unref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { useSystemStore } from '@/store/system/index'
import { removeToken } from '@/utils/system'
import { useUserStore } from '@/store/user'
import { useScreenFull } from '@/hooks/useScreenFull'
import { useMultipleKeydownEvent } from '@/hooks/useAddEvent'
import { useTagStore } from '@/store/tag'
import { useMenuStore } from '@/store/menu'
import { $t, i18n, loadLocaleMessages } from '@/locales/index'

const { state } = storeToRefs(useSystemStore())

const leftWidth = computed(() => {
  return state.value.collapsed ? '50px' : '220px'
})

const { cacheTags } = storeToRefs(useTagStore())

const includesTag = computed(() => {
  const list: string[] = []
  cacheTags.value.forEach((tag) => {
    if (!tag.meta.noCache) {
      list.push(tag.name)
    }
  })
  return list
})

const route = useRoute()
const { getBreadcrumb } = useMenuStore()
const breadList = ref<string[]>([])
watch(
  () => route.path,
  () => {
    breadList.value = getBreadcrumb(route.path)
  },
  {
    immediate: true,
  },
)

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

// 显示搜索
useMultipleKeydownEvent(document, ['Meta', 'k'], () => {
  handleSearch()
})

const { changeScreenfull, isScreenfull } = useScreenFull()

async function handleLocal() {
  const lang = unref(i18n.global.locale)
  if (lang === 'zh-CN') {
    await loadLocaleMessages('en-US')
  }
  else {
    await loadLocaleMessages('zh-CN')
  }
}

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
    document.documentElement.className = state.value.dark ? 'light' : 'dark'
    state.value.dark = !state.value.dark
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
    document.documentElement.className = state.value.dark ? 'light' : 'dark'
    state.value.dark = !state.value.dark
  })
  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: state.value.dark ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 300,
        easing: 'ease-in',
        pseudoElement: state.value.dark
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
      <div class="navbar-left ml-10px flex items-center">
        <span v-if="state.collapsed" class="i-line-md:menu-fold-right cursor-pointer" @click="state.collapsed = !state.collapsed" />
        <span v-else class="i-line-md:menu-fold-left cursor-pointer" @click="state.collapsed = !state.collapsed" />
        <a-breadcrumb class="ml-12px">
          <a-breadcrumb-item v-for="breadcrumb in breadList" :key="breadcrumb">
            {{ breadcrumb }}
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="navbar-right flex items-center">
        <span class="i-ic:round-search ml-15px font-size-22px cursor-pointer" @click="handleSearch" />
        <span class="i-ph:translate-fill ml-15px font-size-22px cursor-pointer" @click="handleLocal" />
        <span class="i-ri:github-fill ml-15px font-size-22px cursor-pointer" @click="goGithub" />
        <span class="i-solar:document-broken ml-15px font-size-22px cursor-pointer" @click="goDocument" />
        <span v-if="!isScreenfull" class="i-mingcute:fullscreen-2-line ml-15px font-size-22px cursor-pointer" @click="changeScreenfull" />
        <span v-else class="i-mingcute:fullscreen-exit-2-fill ml-15px font-size-22px cursor-pointer" @click="changeScreenfull" />
        <span v-if="state.dark" class="i-ph:sun-bold ml-15px font-size-22px cursor-pointer" @click="changeDark" />
        <span v-else class="i-ph:moon-duotone ml-15px font-size-22px cursor-pointer" @click="changeDark" />
        <a-dropdown>
          <a class="ant-dropdown-link ml-15px mr-15px" @click.prevent>
            {{ userInfo?.nickName }}
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;" @click="state.showSystemDrawer = true">{{ $t('system.setting') }}</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="logout">{{ $t('system.logout') }}</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <tagList v-show="state.showTagsView" />
    <div class="main flex-1 bg-pure p-16px">
      <router-view v-slot="{ Component }">
        <keep-alive :include="includesTag">
          <Transition name="fade-transform" mode="out-in">
            <component :is="Component" />
          </Transition>
        </keep-alive>
      </router-view>
    </div>
    <search v-model:visible="searchVisible" />
    <systemConfig />
    <a-button :icon="h(SettingOutlined)" type="primary" class="fixed right-0 top-30%" @click="state.showSystemDrawer = true" />
  </div>
</template>

<style lang="less">
.right-container {
  margin-left: v-bind(leftWidth);
  transition: all 0.5s;
}
</style>
