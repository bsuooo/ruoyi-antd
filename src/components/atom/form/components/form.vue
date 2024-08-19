<script setup lang="ts" name="vForm">
import { translateFormSpan } from '../utils'
import { provide, ref } from 'vue'
import type { FormSpan, ProvideVForm } from '../types'
import type { NamePath } from 'ant-design-vue/lib/form/interface'

interface Props {
  model?: Record<string, any>
  name?: string
  labelCol?: object
  wrapperCol?: object
  autocomplete?: boolean
  span?: FormSpan
}

const props = withDefaults(defineProps<Props>(), {
  model: () => ({}),
  name: 'basic',
  labelCol: () => ({ span: 6 }),
  wrapperCol: () => ({ span: 18 }),
  autocomplete: false,
  span: 24,
})

const key = 'v-form'
provide<ProvideVForm>(key, {
  form: props.model,
  span: translateFormSpan(props.span),
})

const formRef = ref()

function clearValidate(nameList?: NamePath[]) {
  formRef.value.clearValidate(nameList)
}

function validate(nameList?: NamePath[]) {
  return formRef.value.validate(nameList)
}

function validateField(nameList?: NamePath[]) {
  return formRef.value.validateField(nameList)
}

function resetFields(nameList?: NamePath[]) {
  formRef.value.resetFields(nameList)
}

defineExpose({
  clearValidate,
  validate,
  validateField,
  resetFields,
})
</script>

<template>
  <a-form
    ref="formRef"
    :model="model"
    :name="name"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :autocomplete="autocomplete"
    v-bind="$attrs"
  >
    <a-row>
      <slot />
    </a-row>
  </a-form>
</template>
