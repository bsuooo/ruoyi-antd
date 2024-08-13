import screenfull from 'screenfull'
import { onMounted, onUnmounted, ref } from 'vue'
import { message } from 'ant-design-vue'

export function useScreenFull() {
  const isScreenfull = ref(false)

  const changeStatus = () => {
    isScreenfull.value = screenfull.isFullscreen
  }

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

  const changeScreenfull = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle()
      return
    }
    message.warning('当前浏览器不支持全屏')
  }

  return {
    isScreenfull,
    changeScreenfull,
  }
}
