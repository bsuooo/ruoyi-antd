<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { theme } from 'ant-design-vue'
import { useSystemStore } from '@/store/system/index'
import { $t } from '@/locales'

const {
  state,
  primaryColor,
} = storeToRefs(useSystemStore())

type MenuTheme = 'dark' | 'light'

const { token } = theme.useToken()

function changeMenuTheme(theme: MenuTheme) {
  state.value.menuTheme = theme
}

function changePrimaryColor(e: any) {
  primaryColor.value = e.target.value
}
</script>

<template>
  <a-drawer
    v-model:open="state.showSystemDrawer"
    :title="$t('system.style')"
    placement="right"
    width="250px"
    class="bg-base"
  >
    <div class="bg-base">
      <div>{{ $t('system.style') }}：</div>
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
        {{ $t('system.show-tags') }}: <a-switch v-model:checked="state.showTagsView" />
      </div>
      <div class="mt-3 flex items-center justify-between">
        {{ $t('system.slider-logo') }}: <a-switch v-model:checked="state.showRightLogo" />
      </div>
      <div class="mt-3 flex items-center justify-between">
        {{ $t('dynamic-title') }}: <a-switch v-model:checked="state.showDynamicTitle" />
      </div>
      <div class="mt-3 flex items-center justify-between">
        {{ $t('primary-color') }}<input
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
