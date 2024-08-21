import { defineComponent, reactive, ref } from 'vue'
import { Dropdown, Menu, MenuItem } from 'ant-design-vue'
import { onClickOutside } from '@vueuse/core'
import type { Route } from '@/pages/login/types'

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

    onClickOutside(rightMenuRef, () => {
      visible.value = false
    })
    const key = ref(0)
    const showRightMenu = ({ x, y, route }) => {
      position.x = `${x}px`
      position.y = `${y}px`
      currentRoute.value = route
      key.value++
      visible.value = true
    }

    const RightMenu = () => (
      <Menu ref={rightMenuRef}>
        <MenuItem>
          <a href="javascript:;">1st menu item</a>
        </MenuItem>
        <MenuItem>
          <a href="javascript:;">2nd menu item</a>
        </MenuItem>
        <MenuItem>
          <a href="javascript:;">3rd menu item</a>
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
