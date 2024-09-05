export type FormSpan = number | 'full' | 'half' | 'third' | 'quarter'
export type AnyObject = Record<string, any>
export interface ProvideVForm {
  form: AnyObject
  span: number
}
