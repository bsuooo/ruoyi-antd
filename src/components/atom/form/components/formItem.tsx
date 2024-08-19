import { translateFormSpan } from '../utils'
import { computed, defineComponent, inject, useAttrs, useSlots } from 'vue'
import { Col as ACol, FormItem as AFormItem } from 'ant-design-vue'
import type { PropType } from 'vue'
import type { FormSpan, ProvideVForm } from '../types'

function FormItemProps() {
  return {
    label: {
      type: String,
      require: false,
    },
    name: {
      type: String,
      require: false,
    },
    rules: {
      type: Array,
      require: false,
    },
    span: {
      type: [Number, String] as PropType<FormSpan>,
      require: false,
    },
    required: {
      type: Boolean,
      default: false,
      require: false,
    },
  }
}

export default defineComponent({
  name: 'vFormItem',
  props: FormItemProps(),
  setup(props) {
    const injectVForm = inject<ProvideVForm>('v-form')

    const hasFormParent = computed(() => {
      return injectVForm !== undefined
    })

    const span = computed(() => {
      if (props.span) {
        return translateFormSpan(props.span)
      }
      return injectVForm?.span
    })

    const realRules = computed(() => {
      if (props.rules) {
        return props.rules
      }
      if (props.required) {
        return [
          {
            required: true,
            message: `${props.label}不能为空！`,
            trigger: ['change'],
          },
        ]
      }
      return []
    })

    const slots = useSlots()
    const attrs = useAttrs()

    const FormItem = () => (
      <AFormItem
        {...attrs}
        label={props.label}
        name={props.name}
        rules={realRules.value}
        v-slots={{ ...slots }}
      >
      </AFormItem>
    )

    return () => (
      hasFormParent.value
        ? (
            <ACol span={span.value}>
              <FormItem />
            </ACol>
          )
        : (
            <FormItem />
          )
    )
  },
})
