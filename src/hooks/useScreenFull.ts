import screenfull from 'screenfull'
import { onMounted, ref, onUnmounted } from 'vue'
import { message } from 'ant-design-vue'

export const useScreenFull = () => {
	const isScreenfull = ref(false)

	onMounted(() => {
		if (screenfull.isEnabled) {
			screenfull.on('change', changeStatus)
		}
	})

	onUnmounted(() => {
		if (screenfull.isEnabled) {
			screenfull.off('change', changeStatus)
		}
	})

	const changeStatus = () => {
		isScreenfull.value = screenfull.isFullscreen
	}

	const changeScreenfull = () => {
		if (screenfull.isEnabled) {
			screenfull.toggle()
			return
		}
		message.warning('当前浏览器不支持全屏')
	}

	return {
		isScreenfull,
		changeScreenfull
	}
}
