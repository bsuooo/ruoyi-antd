import { onMounted, onUnmounted } from 'vue'

export function useAddEvent(element: HTMLElement | Document, eventName: string, callback: (e: any) => void) {
  const registerEvent = () => {
    element.addEventListener(eventName, callback)
  }

  const clearEvent = () => {
    element.removeEventListener(eventName, callback)
  }

  onMounted(() => {
    registerEvent()
  })

  onUnmounted(() => {
    clearEvent()
  })

  return {
    clearEvent,
  }
}
