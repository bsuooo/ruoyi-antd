import { defineComponent, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Redirect',
  setup() {
    onMounted(() => {
      const route = useRoute()
      const router = useRouter()
      router.replace(route.query.path as string || '/')
    })
  },
})
