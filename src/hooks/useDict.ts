export function useDict(dict: string | string[]) {
  if (typeof dict === 'string') {
    return dict
  }
  else {
    return dict.join(',')
  }
}
