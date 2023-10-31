<template>
	<div class="position-fixed left-0">
		<div
			key="logo"
			class="h-50px flex flex-items-center flex-justify-center bg-#001529 logo"
		>
			<img src="/src//assets//img//logo.png" alt="" width="32" height="32" />
			<span v-if="!collapsed" class="color-white">若依管理系统</span>
		</div>
		<a-menu
			id="dddddd"
			class="page-menu"
			mode="inline"
			:inline-collapsed="collapsed"
			:theme="menuTheme"
		>
			<menuItem v-for="m of menu" :key="m.path" :menu="m" />
		</a-menu>
	</div>
	<div class="position-relative right-container">
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
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	SearchOutlined,
	GithubOutlined,
	QuestionCircleOutlined,
	FullscreenOutlined,
	FontSizeOutlined
} from '@ant-design/icons-vue'
import { useSystemStore } from '@/store/system/index'
import { useMenuStore } from '@/store/menu'
import menuItem from './components/menuItem.vue'

const { collapsed, menuTheme } = storeToRefs(useSystemStore())
const { menu } = storeToRefs(useMenuStore())

const leftWidth = computed(() => {
	return collapsed.value ? '50px' : '220px'
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

.logo {
	width: v-bind(leftWidth);
	transition: all 0.5s;
}

.right-container {
	margin-left: v-bind(leftWidth);
	transition: all 0.5s;
}

.page-menu {
	width: v-bind(leftWidth);
	height: calc(100vh - 50px);
	overflow-y: auto;
	transition: all 0.5s;
}
</style>
