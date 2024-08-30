// antdesign token
import { theme } from 'ant-design-vue'
import { computed } from 'vue'

export function useThemeToken() {
  const token = theme.useToken()
  return token.token
}

export function useThemeRadius() {
  const token = theme.useToken()
  const borderRadius = computed(() => `${token.token.value.borderRadius}px`)
  return borderRadius
}
