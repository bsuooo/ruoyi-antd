import type { FormSpan } from './types'

export function translateFormSpan(formSpan: FormSpan): number {
  if (formSpan === 'full') {
    return 24
  }
  if (formSpan === 'half') {
    return 12
  }
  if (formSpan === 'third') {
    return 8
  }
  if (formSpan === 'quarter') {
    return 6
  }
  return formSpan || 24
}
