import { onUnmounted } from 'vue'
import { useEventListener } from '@vueuse/core'

// 监听事件
export function useAddEvent<E extends keyof WindowEventMap>(element: HTMLElement | Document, eventName: string, callback: (e: WindowEventMap[E]) => void) {
  const cleanup = useEventListener(element, eventName, callback)

  onUnmounted(() => {
    cleanup()
  })

  return {
    cleanup,
  }
}

// 监听按顺序多个按键事件
export function useMultipleKeydownEvent(element: HTMLElement | Document, keys: string[], callback: (e: KeyboardEvent) => void) {
  let currentKeys: string[] = []
  let count = 0

  useAddEvent<'keydown'>(element, 'keydown', (e) => {
    const keyIndex = keys.indexOf(e.key)
    if (keyIndex > -1 && currentKeys.length === keyIndex && !currentKeys[keyIndex]) {
      currentKeys.push(e.key)
      count++
      if (count === keys.length) {
        callback(e)
        count = 0
        currentKeys = []
      }
    }
  })

  useAddEvent<'keyup'>(element, 'keyup', (e) => {
    if (keys.includes(e.key)) {
      const keyIndex = currentKeys.indexOf(e.key)
      if (keyIndex > -1) {
        currentKeys.splice(keyIndex, 1)
        count = currentKeys.length
      }
    }
  })
}
