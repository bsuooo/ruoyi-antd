import { defineConfig } from 'unocss'

export default defineConfig({
  // ...UnoCSS options
  shortcuts: {
    'bg-base': 'bg-white dark:bg-dark-100',
    'color-base': 'text-gray-900 dark:text-gray-300',
    'bg-pure': 'bg-#f6f7f7 dark:bg-dark-100',
  },
})
