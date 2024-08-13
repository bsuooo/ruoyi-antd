import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useSystemStore = defineStore('system', () => {
  const collapsed = ref(false)
  const menuTheme = ref('dark')
  const showRightLogo = ref(true)
  const showTagsView = ref(true)
  const showDynamicTitle = ref(false)
  const dark = ref(false)

  const menuBgColor = computed(() => {
    return menuTheme.value === 'dark' ? '#001529' : '#fff'
  })

  const MenuFtColor = computed(() => {
    return menuTheme.value === 'dark' ? '#fff' : '#001529'
  })

  const primaryColor = ref('#1677ff')

  const logoBgColor = computed(() => {
    if (menuTheme.value === 'dark') {
      return menuBgColor.value
    }
    return dark.value ? '#141414' : menuBgColor.value
  })

  const logoFtColor = computed(() => {
    if (menuTheme.value === 'dark') {
      return MenuFtColor.value
    }
    return dark.value ? '#fff' : MenuFtColor.value
  })
  return {
    collapsed,
    menuTheme,
    menuBgColor,
    MenuFtColor,
    showRightLogo,
    showTagsView,
    showDynamicTitle,
    primaryColor,
    dark,
    logoBgColor,
    logoFtColor,
  }
})
