<script setup lang="ts" name="svgIcon">
import Icon from '@ant-design/icons-vue'
import { computed, defineProps } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#fff',
  },
})

const iconName = computed(() => {
  return `#icon-${props.name}`
})
</script>

<template>
  <Icon v-if="name" v-bind="$attrs">
    <template #component>
      <slot>
        <svg width="14px" height="14px">
          <use
            :xlink:href="iconName"
            width="14px"
            height="14px"
            :fill="color"
          />
        </svg>
      </slot>
    </template>
  </Icon>
</template>

<style scoped lang="less"></style>
