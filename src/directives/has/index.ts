// 操作权限处理
import type { DirectiveBinding, ObjectDirective } from 'vue'
import { useUserStore } from '@/store/user'

const AllPermission = '*:*:*'

function useHasPermissions(value: string | string[]) {
  const userStore = useUserStore()
  const permissions = userStore.permissions || []

  if (!value) {
    return true
  }

  if (typeof value === 'string') {
    if (value === AllPermission) {
      return true
    }
    if (permissions.includes(value)) {
      return true
    }
    return false
  }

  if (Array.isArray(value) && value.length > 0) {
    return permissions.some((permission) => {
      return AllPermission === permission || value.includes(permission)
    })
  }

  console.error(`permission code must be a string or array of string`)
  return true
}

const has: ObjectDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const has = useHasPermissions(binding.value)
    if (!has) {
      el.parentNode?.removeChild(el)
    }
  },
}

export default has
