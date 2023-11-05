<template>
	<pageMenu />
	<div class="position-relative right-container">
		<div class="h-50px flex items-center justify-between">
			<div class="navbar-left ml-10px">
				<a-button @click="collapsed = !collapsed">
					<MenuUnfoldOutlined v-if="collapsed" />
					<MenuFoldOutlined v-else />
				</a-button>
			</div>
			<div class="navbar-right">
				<SearchOutlined class="ml-15px font-size-22px cursor-pointer" />
				<GithubOutlined
					class="ml-15px font-size-22px cursor-pointer"
					@click="goGithub"
				/>
				<QuestionCircleOutlined
					class="ml-15px font-size-22px cursor-pointer"
					@click="goDocument"
				/>
				<FullscreenOutlined
					v-if="!isScreenfull"
					class="ml-15px font-size-22px cursor-pointer"
					@click="changeScreenfull"
				/>
				<FullscreenExitOutlined
					v-else
					class="ml-15px font-size-22px cursor-pointer"
					@click="changeScreenfull"
				/>
				<FontSizeOutlined
					class="ml-15px font-size-22px cursor-pointer"
					@click="changeDark"
				/>
				<a-dropdown>
					<a class="ant-dropdown-link" @click.prevent>
						管理员
						<DownOutlined />
					</a>
					<template #overlay>
						<a-menu>
							<systemConfig />
							<a-menu-item>
								<a href="javascript:;" @click="logout">退出登录</a>
							</a-menu-item>
						</a-menu>
					</template>
				</a-dropdown>
			</div>
		</div>
		<tagList v-show="showTagsView" />
		<div class="main"></div>
	</div>
</template>

<script setup lang="ts">
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	SearchOutlined,
	GithubOutlined,
	QuestionCircleOutlined,
	FullscreenOutlined,
	FontSizeOutlined,
	DownOutlined,
	FullscreenExitOutlined
} from '@ant-design/icons-vue'
import tagList from './components/tagList.vue'
import pageMenu from './components/pageMenu.vue'
import { useSystemStore } from '@/store/system/index'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { removeToken } from '@/utils/system'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { useScreenFull } from '@/hooks/useScreenFull'
import systemConfig from './components/systemConfig.vue'

const { collapsed, showTagsView, dark } = storeToRefs(useSystemStore())

const leftWidth = computed(() => {
	return collapsed.value ? '50px' : '220px'
})

const goGithub = () => {
	window.open('https://github.com/mmmmr/ruoyi-antd')
}

const goDocument = () => {
	window.open('http://doc.ruoyi.vip/ruoyi-vue/')
}

const { changeScreenfull, isScreenfull } = useScreenFull()

const router = useRouter()
const { userInfo, roles, permissions } = storeToRefs(useUserStore())
const logout = () => {
	router.push('/login')
	removeToken()
	userInfo.value = null
	roles.value = []
	permissions.value = []
	message.success('已退出登录！')
}

const changeDark = () => {
	document.documentElement.className = dark.value ? 'light' : 'dark'
	dark.value = !dark.value
}
</script>
<style lang="less" scoped>
.right-container {
	margin-left: v-bind(leftWidth);
	transition: all 0.5s;
}
</style>
