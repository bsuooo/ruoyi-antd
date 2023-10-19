import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Components from "unplugin-vue-components/vite"
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"
import vueSetupExtend from "vite-plugin-vue-setup-extend"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
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
			"@": "/src"
		}
	}
})
