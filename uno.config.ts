import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
        'height': '24px',
        'width': '24px',
      },
    }),
    presetAttributify({ /* preset options */}),
    presetUno(),
  ],
  shortcuts: {
    'bg-base': 'bg-white dark:bg-dark-100',
    'color-base': 'text-gray-900 dark:text-gray-300',
    'bg-pure': 'bg-#f6f7f7 dark:bg-#14161A',
    'wh-full': 'w-full h-full',
    'base-border-color': 'border-color-#E4E4E7 dark:border-color-#36363A',
  },
})
