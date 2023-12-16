<template>
	<a-button @click="handleClick">
		{{ state.count }}
	</a-button>
  <micro-app name='role-app' url='http://localhost:5173' iframe clear-data keep-alive></micro-app>
</template>

<script lang="ts" setup name="Role">
import { reactive } from 'vue'
import microAp from '@micro-zoe/micro-app'


type State = {
  count: number
}

const state = reactive<State>({
  count: 0
})

const handleClick = () => {
  state.count++
  microAp.forceSetData('role-app', state)
}

// 监听函数
function dataListener (data: State) {
  state.count = data.count
}

// 监听来自子应用my-app的数据
microAp.addDataListener('role-app', dataListener)

// 解绑监听my-app子应用的函数
// microApp.removeDataListener('my-app', dataListener)

// 清空所有监听my-app子应用的函数
// microApp.clearDataListener('my-app')
</script>
