<template>
	<a-col :span="span">
		<a-form-item :label="label" :name="name" :rules="realRules" v-bind="$attrs">
			<slot />
		</a-form-item>
	</a-col>
</template>
<script setup lang="ts" name="vFormItem">
import { defineProps, computed } from 'vue'

const props = defineProps({
	label: {
		type: String,
		default: ''
	},
	name: {
		type: String,
		default: ''
	},
	rules: {
		type: Array,
		default: undefined
	},
	span: {
		type: Number,
		default: 24
	},
	required: {
		type: Boolean,
		default: false
	}
})

const realRules = computed(() => {
	if (props.rules) return props.rules
	if (props.required)
		return [
			{
				required: true,
				message: `${props.label}不能为空！`,
				trigger: ['change', 'blur']
			}
		]
	return []
})
</script>
