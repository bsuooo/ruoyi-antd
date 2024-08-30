import { notification } from 'ant-design-vue'
import { SmileOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'

// 轮训时间
const time = 60000
// 关闭版本更新轮询
const CLOSE_VERSION_WATCH = false
let current: string[]
let timer: NodeJS.Timeout

function compare(oldArr: string[], newArr: string[]) {
  console.log(oldArr, newArr)
  const base = oldArr.length
  const arr = Array.from(new Set(oldArr.concat(newArr)))
  // 如果新旧length 一样无更新
  if (arr.length === base) {
    return
  }
  // 更新
  clearInterval(timer)
  notification.open({
    message: '系统提示',
    description:
      '系统有更新，请刷新页面以使用最新功能！',
    duration: 0,
    icon: () => h(SmileOutlined, { style: 'color: #108ee9' }),
  })
}

async function getHtml() {
  const html = await fetch(`/?t=${new Date().getTime()}`, {
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    },
  }).then(res => res.text())
  return html
}

async function parserScript(html: string) {
  const reg = /<script(?:\s[^>]*)?>(.*?)<\/script\s*>/gi // script正则
  return html.match(reg) as string[] // 匹配script标签
}

async function startWatch() {
  timer = setInterval(async () => {
    const newHtml = await getHtml()
    const n = await parserScript(newHtml)
    compare(current, n)
  }, time)
}

async function init() {
  const html: string = await getHtml()
  current = await parserScript(html)
  startWatch()
}

if (!CLOSE_VERSION_WATCH && process.env.NODE_ENV !== 'development') {
  init()
}
