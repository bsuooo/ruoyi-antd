import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

export const useSystemStore = defineStore('system', () => {
  const state = reactive({
    collapsed: false,
    menuTheme: 'light',
    showRightLogo: true,
    showTagsView: true,
    showDynamicTitle: false,
    dark: false,
    currentRouteTitle: '首页',
    defaultTitle: 'ruoyi-antd',
    primaryColor: '#1677ff',
  })

  const menuBgColor = computed(() => {
    return state.menuTheme === 'dark' ? '#001529' : '#fff'
  })

  const MenuFtColor = computed(() => {
    return state.menuTheme === 'dark' ? '#fff' : '#001529'
  })

  const primaryColor = ref('#1677ff')

  const logoBgColor = computed(() => {
    if (state.menuTheme === 'dark') {
      return menuBgColor.value
    }
    return state.dark ? '#141414' : menuBgColor.value
  })

  const logoFtColor = computed(() => {
    if (state.menuTheme === 'dark') {
      return MenuFtColor.value
    }
    return state.dark ? '#fff' : MenuFtColor.value
  })
  return {
    menuBgColor,
    MenuFtColor,
    primaryColor,
    logoBgColor,
    logoFtColor,
    state,
  }
})
