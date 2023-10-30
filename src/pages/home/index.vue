<template>
	<div class="position-fixed left-0">
		<div
			key="logo"
			class="h-50px flex flex-items-center flex-justify-center bg-#001529"
			:style="`width: ${leftWidth}px ;`"
		>
			<img src="/src//assets//img//logo.png" alt="" width="32" height="32" />
			<span v-if="!collapsed" class="color-white">若依管理系统</span>
		</div>
		<a-menu
			id="dddddd"
			:style="`width: ${leftWidth}px; height: 100vh`"
			mode="inline"
			:inline-collapsed="collapsed"
			theme="dark"
		>
			<a-sub-menu key="sub1">
				<template #title>Navigation One</template>
				<a-menu-item-group key="g1">
					<template #title>Item 1</template>
					<a-menu-item key="1">Option 1</a-menu-item>
					<a-menu-item key="2">Option 2</a-menu-item>
				</a-menu-item-group>
				<a-menu-item-group key="g2" title="Item 2">
					<a-menu-item key="3">Option 3</a-menu-item>
					<a-menu-item key="4">Option 4</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
		</a-menu>
	</div>
	<div class="position-relative" :style="`margin-left: ${leftWidth}px`">
		<div class="h-50px flex items-center justify-between">
			<div class="navbar-left ml-10px">
				<a-button @click="collapsed = !collapsed">
					<MenuUnfoldOutlined v-if="collapsed" />
					<MenuFoldOutlined v-else />
				</a-button>
			</div>
			<div class="navbar-right">
				<SearchOutlined class="ml-8px font-size-22px cursor-pointer" />
				<GithubOutlined
					class="ml-8px font-size-22px cursor-pointer"
					@click="goGithub"
				/>
				<QuestionCircleOutlined
					class="ml-8px font-size-22px cursor-pointer"
					@click="goDocument"
				/>
				<FullscreenOutlined class="ml-8px font-size-22px cursor-pointer" />
				<FontSizeOutlined class="ml-8px font-size-22px cursor-pointer" />
			</div>
		</div>
		<div class="h-30px mt-4px mb-4px">
			<span
				class="color-white font-size-12px bg-blue p-4px ml-10px tab-list tab-list-active"
				>首页</span
			>
		</div>
		<div class="main"></div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	SearchOutlined,
	GithubOutlined,
	QuestionCircleOutlined,
	FullscreenOutlined,
	FontSizeOutlined
} from '@ant-design/icons-vue'

const collapsed = ref(false)

const leftWidth = computed(() => {
	return collapsed.value ? 50 : 220
})

const goGithub = () => {
	window.open('https://github.com/mmmmr/ruoyi-antd')
}

const goDocument = () => {
	window.open('http://doc.ruoyi.vip/ruoyi-vue/')
}
</script>
<style lang="less" scoped>
.tab-list-active::before {
	content: '';
	background: #fff;
	display: inline-block;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	position: relative;
	margin-right: 2px;
}
</style>
