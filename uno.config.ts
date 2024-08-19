import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        'local-icons': FileSystemIconLoader(
          './src/assets/icon/svg',
          svg => svg.replace(/#fff/, 'currentColor'),
        ),
      },
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
    'bg-pure': 'bg-#f6f7f7 dark:bg-dark-100',
  },
})
