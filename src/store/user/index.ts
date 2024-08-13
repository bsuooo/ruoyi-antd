import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/pages/login/types/index'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<User | null>()
  const token = ref<string>()
  const roles = ref<string[]>([])
  const permissions = ref<string[]>([])

  return {
    userInfo,
    token,
    roles,
    permissions,
  }
})
