export interface dictItem {
  value: string
  label: string
}
export type dict = dictItem[]

// 回显数据字典（字符串）
export function selectDictLabel(dict: dict, value: string) {
  if (value === undefined) {
    return ''
  }
  const dictItem = dict.find(item => item.value === value)
  return dictItem ? dictItem.label : value
}

// 回显数据字典（字符串数组）
export function selectDictLabels(
  dict: dict,
  value: string[],
  spaceCharacter: string = ' ',
) {
  if (value === undefined) {
    return ''
  }
  const result = dict.filter(item => value.includes(item.value))

  return result.map(item => item.label).join(spaceCharacter)
}
