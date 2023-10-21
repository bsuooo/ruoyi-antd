<template>
	<a-col :span="span">
		<a-form-item :label="label" :name="name" :rules="rules">
			<slot />
		</a-form-item>
	</a-col>
</template>
<script setup lang="ts" name="vFormItem">
import { defineProps } from 'vue'

defineProps({
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
		default: () => []
	},
	span: {
		type: Number,
		default: 24
	}
})
</script>
