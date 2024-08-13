// antdesign token
import { theme } from 'ant-design-vue'

export function useThemeToken() {
  const token = theme.useToken()
  return token.token
}
