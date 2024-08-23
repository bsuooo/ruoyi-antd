import { defineComponent, reactive, ref } from 'vue'
import { Dropdown, Menu, MenuItem } from 'ant-design-vue'
import { onClickOutside } from '@vueuse/core'
import type { Route } from '@/pages/login/types'
import { useTagStore } from '@/store/tag'

export default defineComponent({
  name: 'tagMenu',
  setup(_, { expose }) {
    const visible = ref(false)

    const position = reactive({
      x: '0',
      y: '0',
    })

    const currentRoute = ref<Route>()
    const rightMenuRef = ref()

    const hiddenMenu = () => {
      visible.value = false
    }
    onClickOutside(rightMenuRef, hiddenMenu)
    const key = ref(0)
    const showRightMenu = ({ x, y, route }: { x: number, y: number, route: Route }) => {
      position.x = `${x}px`
      position.y = `${y}px`
      currentRoute.value = route
      key.value++
      visible.value = true
    }

    const { refreshTag, delCurrentTag, delAllTag, delLeftTag, delOtherTag, delRightTag } = useTagStore()

    const RightMenu = () => (
      <Menu ref={rightMenuRef}>
        <MenuItem>
          <a href="javascript:;" onClick={() => refreshTag(hiddenMenu)}>刷新页面</a>
        </MenuItem>
        <MenuItem>
          <a href="javascript:;" onClick={() => delCurrentTag(currentRoute.value?.path, hiddenMenu)}>关闭当前</a>
        </MenuItem>
        <MenuItem>
          <a href="javascript:;" onClick={() => delOtherTag(currentRoute.value?.path, hiddenMenu)}>关闭其他</a>
        </MenuItem>
        <MenuItem>
          <a href="javascript:;" onClick={() => delAllTag(hiddenMenu)}>全部关闭</a>
        </MenuItem>
        <MenuItem>
          <a href="javascript:;" onClick={() => delRightTag(currentRoute.value?.path, hiddenMenu)}>关闭右侧</a>
        </MenuItem>
        <MenuItem>
          <a href="javascript:;" onClick={() => delLeftTag(currentRoute.value?.path, hiddenMenu)}>关闭左侧</a>
        </MenuItem>
      </Menu>
    )

    expose({
      showRightMenu,
    })

    return () => (
      <Dropdown
        key={key.value}
        open={visible.value}
        v-slots={{
          overlay: RightMenu,
        }}
      >
        <div class="fixed w-1px h-1px" style={{ left: position.x, top: position.y }}></div>
      </Dropdown>
    )
  },
})
