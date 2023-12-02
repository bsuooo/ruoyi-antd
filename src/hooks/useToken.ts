// antdesign token
import { theme } from "ant-design-vue";
export const useThemeToken = () => {
  const token = theme.useToken();
  return token.token;
}
