export type time = string | number | Date

export interface formatObj {
  y: number
  m: number
  d: number
  h: number
  i: number
  s: number
  a: number
}

export function parseTime(time: time, pattern?: string) {
  if (!time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  }
  else {
    if (typeof time === 'string' && /^\d+$/.test(time)) {
      time = Number.parseInt(time)
    }
    else if (typeof time === 'string') {
      time = time
        .replace(/-/g, '/')
        .replace('T', ' ')
        .replace(/\.\d{3}/g, '')
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj: formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(
    /\{([ymdhisa])+\}/g,
    (result, key: keyof formatObj) => {
      const value = formatObj[key]
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value] as string
      }
      if (result.length > 0 && value < 10) {
        return (`0${value}`) as string
      }
      return (value || 0).toString() as string
    },
  )
  return time_str
}
