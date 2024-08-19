import { translateFormSpan } from '../utils'
import { computed, defineComponent, inject, useAttrs, useSlots } from 'vue'
import { Col as ACol, FormItem as AFormItem } from 'ant-design-vue'
import type { PropType } from 'vue'
import type { FormSpan, ProvideVForm } from '../types'
import { $t } from '@/locales'

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
    needTranslate: {
      type: Boolean,
      default: true,
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

    const translatedLabel = computed(() => {
      if (props.label && props.needTranslate) {
        return $t(props.label)
      }
      return ''
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
            message: `${translatedLabel.value}不能为空！`,
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
        label={translatedLabel.value}
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
