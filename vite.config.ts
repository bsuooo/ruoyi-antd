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
		test: {
			environment: 'jsdom'
		},
		resolve: {
			alias: {
				'@': '/src'
			}
		},
		server: {
			host: true, // 0.0.0.0 或 true 开启所有
			port: Number(env.VITE_APP_PORT), // 为什么是string呢 ?
			open: true, // 运行后是否打开浏览器
			proxy: {
				'/dev-api': {
					target: 'http://vue.ruoyi.vip/prod-api',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/dev-api/, '')
				}
			}
		}
	}
})
