<template>
	<Icon v-bind="$attrs" v-if="name">
		<template #component>
			<svg width="14px" height="14px">
				<use
					:xlink:href="iconName"
					width="14px"
					height="14px"
					:fill="color"
				></use>
			</svg>
		</template>
	</Icon>
</template>

<script setup lang="ts" name="svgIcon">
import Icon from '@ant-design/icons-vue'
import { defineProps, computed } from 'vue'

const props = defineProps({
	name: {
		type: String,
		default: ''
	},
	color: {
		type: String,
		default: '#fff'
	}
})

const iconName = computed(() => {
	return `#icon-${props.name}`
})
</script>
<style scoped lang="less"></style>
