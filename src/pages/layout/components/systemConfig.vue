<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { theme } from 'ant-design-vue'
import { useSystemStore } from '@/store/system/index'

const {
  menuTheme,
  showRightLogo,
  showTagsView,
  showDynamicTitle,
  primaryColor,
} = storeToRefs(useSystemStore())

type MenuTheme = 'dark' | 'light'

const open = ref<boolean>(false)
function showDraw() {
  open.value = true
}

const { token } = theme.useToken()

function changeMenuTheme(theme: MenuTheme) {
  menuTheme.value = theme
}

function changePrimaryColor(e: any) {
  primaryColor.value = e.target.value
}
</script>

<template>
  <a-menu-item>
    <a href="javascript:;" @click="showDraw">系统设置</a>
  </a-menu-item>
  <a-drawer
    v-model:open="open"
    title="系统风格设置"
    placement="right"
    :mask-closable="false"
    width="250px"
    class="bg-base"
  >
    <div class="bg-base">
      <div>主题风格设置：</div>
      <div class="mt-3">
        <img
          src="@/assets/img/darkMenu.svg"
          class="mr-5 cursor-pointer"
          @click="changeMenuTheme('dark')"
        >
        <img
          class="cursor-pointer"
          src="@/assets/img/lightMenu.svg"
          @click="changeMenuTheme('light')"
        >
      </div>
      <div class="mt-3 flex items-center justify-between">
        开启 Tags-View: <a-switch v-model:checked="showTagsView" />
      </div>
      <div class="mt-3 flex items-center justify-between">
        侧边栏 Logo: <a-switch v-model:checked="showRightLogo" />
      </div>
      <div class="mt-3 flex items-center justify-between">
        动态标题: <a-switch v-model:checked="showDynamicTitle" />
      </div>
      <div class="mt-3 flex items-center justify-between">
        主题颜色：<input
          type="color"
          :value="primaryColor"
          @input="changePrimaryColor"
        >
      </div>
    </div>
  </a-drawer>
</template>

<style scoped>
input[type='color'] {
  border: 1px solid v-bind('token.colorBorder');
  background-color: v-bind('token.colorBgBase');
}
</style>
