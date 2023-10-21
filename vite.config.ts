import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
	const env = loadEnv(mode, process.cwd())
	return {
		plugins: [
			vue(),
			UnoCSS(),
			vueSetupExtend(),
			Components({
				resolvers: [
					AntDesignVueResolver({
						importStyle: false
					})
				]
			})
		],
		resolve: {
			alias: {
				'@': '/src'
			}
		},
		server: {
			host: true, // 0.0.0.0 或 true 开启所有
			port: Number(env.VITE_APP_PORT),
			open: true, // 运行后是否打开浏览器
			proxy: {
				[env.VITE_API_BASE_URL]: {
					target: 'http://vue.ruoyi.vip/prod-api/',
					changeOrigin: true,
					rewrite: (path) =>
						path.replace(new RegExp(`^${env.VITE_API_BASE_URL}`), '')
				}
			}
		}
	}
})
