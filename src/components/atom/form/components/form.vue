<template>
	<a-form
		ref="formRef"
		:model="model"
		:name="name"
		:label-col="labelCol"
		:wrapper-col="wrapperCol"
		:autocomplete="autocomplete"
	>
		<a-row>
			<slot />
		</a-row>
	</a-form>
</template>

<script setup lang="ts" name="vForm">
import { ref, defineProps } from 'vue'
import { NamePath } from 'ant-design-vue/lib/form/interface'

defineProps({
	model: {
		type: Object,
		default: () => {}
	},
	name: {
		type: String,
		default: 'basic'
	},
	labelCol: {
		type: Object,
		default: () => ({ span: 6 })
	},
	wrapperCol: {
		type: Object,
		default: () => ({ span: 18 })
	},
	autocomplete: {
		type: Boolean,
		default: false
	}
})

const formRef = ref()

const clearValidate = (nameList?: NamePath[]) => {
	formRef.value.clearValidate(nameList)
}

const validate = (nameList?: NamePath[]) => {
	return formRef.value.validate(nameList)
}

const validateField = (nameList?: NamePath[]) => {
	return formRef.value.validateField(nameList)
}

const resetFields = (nameList?: NamePath[]) => {
	formRef.value.resetFields(nameList)
}

defineExpose({
	clearValidate,
	validate,
	validateField,
	resetFields
})
</script>
