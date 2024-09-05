<script setup lang="ts" name="svgIcon">
import Icon from '@ant-design/icons-vue'
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#fff',
  },
  width: {
    type: String,
    default: '14px',
  },
  height: {
    type: String,
    default: '14px',
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
        <svg :width="width" :height="height">
          <use
            :xlink:href="iconName"
            :width="width"
            :height="height"
            :fill="color"
          />
        </svg>
      </slot>
    </template>
  </Icon>
</template>

<style scoped lang="less"></style>
