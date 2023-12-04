<template>
	<pageMenu />
	<div class="position-relative right-container flex h-100% flex-col">
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
				<icon
					class="ml-15px font-size-22px cursor-pointer"
					@click="changeDark"
					v-if="dark"
				>
					<template #component>
						<svg
							t="1701522682612"
							class="icon"
							viewBox="0 0 1024 1024"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							p-id="1474"
							width="22"
							height="22"
						>
							<path
								d="M960 512l-128 128v192h-192l-128 128-128-128H192v-192l-128-128 128-128V192h192l128-128 128 128h192v192z"
								fill="#FFD878"
								p-id="1475"
							></path>
							<path
								d="M736 512a224 224 0 1 0-448 0 224 224 0 1 0 448 0z"
								fill="#FFE4A9"
								p-id="1476"
							></path>
							<path
								d="M512 109.248L626.752 224H800v173.248L914.752 512 800 626.752V800h-173.248L512 914.752 397.248 800H224v-173.248L109.248 512 224 397.248V224h173.248L512 109.248M512 64l-128 128H192v192l-128 128 128 128v192h192l128 128 128-128h192v-192l128-128-128-128V192h-192l-128-128z"
								fill="#4D5152"
								p-id="1477"
							></path>
							<path
								d="M512 320c105.888 0 192 86.112 192 192s-86.112 192-192 192-192-86.112-192-192 86.112-192 192-192m0-32a224 224 0 1 0 0 448 224 224 0 0 0 0-448z"
								fill="#4D5152"
								p-id="1478"
							></path>
						</svg>
					</template>
				</icon>
				<icon
					class="ml-15px font-size-22px cursor-pointer"
					@click="changeDark"
					v-else
				>
					<template #component>
						<svg
							t="1701523414936"
							class="icon"
							viewBox="0 0 1024 1024"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							p-id="3200"
							width="22"
							height="22"
						>
							<path
								d="M536.216 511.748c-46.316-92.452-42.34-196.896 1.496-282.352 7.028-13.696-3.168-30.072-18.544-29.248-46.112 2.472-92.5 15.248-135.848 39.548-142.188 79.716-198.988 258.284-129.16 405.584 75.208 158.644 265.672 223.712 421.832 145.48a310.464 310.464 0 0 0 99.628-78.832c9.844-11.8 2.804-29.744-12.348-32.312-94.7-16.056-180.736-75.408-227.056-167.868z"
								fill="#FCC800"
								p-id="3201"
							></path>
							<path
								d="M293.116 645.28c-69.828-147.296-13.028-325.864 129.16-405.58 34.628-19.416 71.2-31.452 108.016-36.776a19.268 19.268 0 0 0-11.124-2.772c-46.112 2.472-92.5 15.248-135.848 39.548-142.188 79.712-198.988 258.28-129.16 405.58 56.652 119.5 178.696 185.868 302.22 177.928-109.576-6.72-212.588-71.036-263.264-177.928z"
								fill="#E8E6F4"
								p-id="3202"
							></path>
							<path
								d="M536.56 836.012c-35.552 0-71.26-5.932-105.936-17.884-83.088-28.632-149.608-88.192-187.304-167.712-72.66-153.272-13.744-338.28 134.136-421.192 43.852-24.584 91.312-38.4 141.076-41.064a31.4 31.4 0 0 1 28.24 14.412c6.36 9.812 6.964 21.884 1.62 32.296-43.544 84.892-44.084 186.388-1.44 271.504s124.26 145.46 218.332 161.412c11.54 1.956 20.848 9.672 24.904 20.64 3.972 10.752 1.972 22.416-5.348 31.192-28.564 34.24-63.376 61.784-103.464 81.876-45.804 22.94-95.156 34.52-144.816 34.52z m-16.28-623.896c-0.152 0-0.308 0.004-0.472 0.016-46.056 2.464-90.004 15.26-130.62 38.032-136.916 76.756-191.46 248.056-124.184 389.972 34.908 73.636 96.5 128.788 173.432 155.3 76.96 26.52 159.416 21.048 232.18-15.408 37.12-18.596 69.348-44.096 95.784-75.788 2.432-2.916 1.836-5.948 1.26-7.5a8.2 8.2 0 0 0-6.4-5.292c-101.584-17.228-189.724-82.396-235.78-174.324-46.052-91.928-45.472-201.54 1.552-293.208a8.124 8.124 0 0 0-0.408-8.288c-0.864-1.336-2.816-3.512-6.344-3.512z"
								fill="#44294F"
								p-id="3203"
							></path>
							<path
								d="M652.828 706.52c-73.46-35.748-133.924-95.376-170.26-167.9-22.932-45.788-35.948-95.128-38.676-146.652l23.968-1.264c2.552 48.204 14.72 94.352 36.168 137.168 33.984 67.836 90.56 123.616 159.3 157.072l-10.5 21.576zM467.8 354.728l-23.968-1.188c0.696-14.036 2.2-28.188 4.472-42.064l23.688 3.884a352.296 352.296 0 0 0-4.192 39.368z"
								fill="#44294F"
								p-id="3204"
							></path>
							<path
								d="M365.908 707.008c-6.908 0-13.504 1.26-19.656 3.46 0.052-1.156 0.176-2.292 0.176-3.46 0-43.032-34.884-77.916-77.916-77.916s-77.916 34.884-77.916 77.916c0 5.712 0.652 11.26 1.82 16.624a58.216 58.216 0 0 0-40.78-16.624c-32.276 0-58.436 26.164-58.436 58.436s26.164 58.436 58.436 58.436h214.272c32.272 0 58.436-26.164 58.436-58.436s-26.164-58.436-58.436-58.436zM658.092 391.336c6.908 0 13.504 1.26 19.656 3.46-0.052-1.156-0.176-2.292-0.176-3.46 0-43.032 34.884-77.916 77.916-77.916s77.916 34.884 77.916 77.916c0 5.712-0.652 11.26-1.82 16.624a58.216 58.216 0 0 1 40.78-16.624c32.276 0 58.436 26.164 58.436 58.436s-26.164 58.436-58.436 58.436h-214.272c-32.272 0-58.436-26.164-58.436-58.436s26.164-58.436 58.436-58.436z"
								fill="#94D3CC"
								p-id="3205"
							></path>
							<path
								d="M132.156 765.444c0-25.428 16.268-47 38.94-55.036a58.004 58.004 0 0 0-19.464-3.404c-32.276 0-58.436 26.164-58.436 58.436s26.164 58.436 58.436 58.436h38.96c-32.272 0.008-58.436-26.156-58.436-58.432zM385.216 710.34l-0.008 0.124c0.06-0.02 0.128-0.036 0.188-0.06l-0.18-0.064zM190.596 707.008c15.872 0 30.248 6.352 40.78 16.624a77.944 77.944 0 0 1-1.82-16.624c0-36.292 24.848-66.7 58.436-75.364a77.816 77.816 0 0 0-19.48-2.552c-43.036 0-77.916 34.884-77.916 77.916zM697.052 391.336c6.908 0 13.504 1.26 19.656 3.46-0.052-1.156-0.176-2.292-0.176-3.46 0-36.292 24.848-66.7 58.436-75.364a77.816 77.816 0 0 0-19.48-2.552c-43.032 0-77.916 34.884-77.916 77.916 0 1.124 0.116 2.224 0.168 3.336a58.192 58.192 0 0 1 19.312-3.336zM638.616 449.776c0-25.428 16.268-47 38.944-55.036a58.124 58.124 0 0 0-19.468-3.4c-32.272 0-58.436 26.164-58.436 58.436s26.164 58.436 58.436 58.436h38.96c-32.272 0-58.436-26.164-58.436-58.436z"
								fill="#E8E6F4"
								p-id="3206"
							></path>
							<path
								d="M365.908 835.884H151.636c-38.84 0-70.436-31.596-70.436-70.436s31.596-70.436 70.436-70.436c9.472 0 18.68 1.876 27.196 5.444 3.364-46.536 42.3-83.364 89.68-83.364 45.68 0 83.516 34.244 89.18 78.412a68.88 68.88 0 0 1 8.216-0.492c38.84 0 70.436 31.596 70.436 70.436s-31.596 70.436-70.436 70.436z m-214.272-116.876c-25.604 0-46.436 20.832-46.436 46.436s20.832 46.436 46.436 46.436h214.268c25.604 0 46.436-20.832 46.436-46.436s-20.832-46.436-46.436-46.436c-5.24 0-10.492 0.928-15.608 2.76a12.004 12.004 0 0 1-16.032-11.828l0.088-1.544c0.032-0.46 0.072-0.92 0.072-1.392 0-36.348-29.572-65.916-65.916-65.916-36.348 0-65.916 29.572-65.916 65.916 0 4.628 0.52 9.364 1.548 14.068a12 12 0 1 1-20.108 11.144 46.172 46.172 0 0 0-32.396-13.208z"
								fill="#44294F"
								p-id="3207"
							></path>
							<path
								d="M872.364 520.212h-214.268c-38.84 0-70.436-31.596-70.436-70.436s31.596-70.436 70.436-70.436c2.744 0 5.484 0.164 8.216 0.492 5.664-44.164 43.5-78.408 89.18-78.408 47.38 0 86.316 36.828 89.68 83.36a70.16 70.16 0 0 1 27.196-5.444c38.84 0 70.436 31.596 70.436 70.436s-31.6 70.436-70.44 70.436z m-214.272-116.876c-25.604 0-46.436 20.832-46.436 46.436s20.832 46.436 46.436 46.436h214.268c25.604 0 46.436-20.832 46.436-46.436s-20.832-46.436-46.436-46.436a46.16 46.16 0 0 0-32.4 13.216 12 12 0 0 1-20.108-11.144c1.028-4.708 1.548-9.44 1.548-14.072 0-36.344-29.572-65.916-65.916-65.916-36.344 0-65.916 29.572-65.916 65.916 0 0.468 0.04 0.928 0.072 1.392l0.088 1.544a12 12 0 0 1-16.032 11.828 46.08 46.08 0 0 0-15.604-2.764z"
								fill="#44294F"
								p-id="3208"
							></path>
						</svg>
					</template>
				</icon>
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
		<div class="main flex-1 bg-pure">
			<router-view v-slot="{ Component }">
				<keep-alive :include="cacheTags">
					<component :is="Component" />
				</keep-alive>
			</router-view>
		</div>
	</div>
</template>

<script setup lang="ts" name="layout">
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	SearchOutlined,
	GithubOutlined,
	QuestionCircleOutlined,
	FullscreenOutlined,
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
import Icon from '@ant-design/icons-vue'
import { useTagStore } from '@/store/tag'

const { collapsed, showTagsView, dark } = storeToRefs(useSystemStore())

const { cacheTags } = storeToRefs(useTagStore())

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

const isAppearanceTransition =
	// @ts-expect-error: Transition API
	document.startViewTransition &&
	!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches

const changeDark = (event: MouseEvent) => {
	if (!isAppearanceTransition) {
		document.documentElement.className = dark.value ? 'light' : 'dark'
		dark.value = !dark.value
		return
	}
	const x = event.clientX
	const y = event.clientY
	const endRadius = Math.hypot(
		Math.max(x, innerWidth - x),
		Math.max(y, innerHeight - y)
	)

	// @ts-expect-error: Transition API
	const transition = document.startViewTransition(() => {
		document.documentElement.className = dark.value ? 'light' : 'dark'
		dark.value = !dark.value
	})
	transition.ready.then(() => {
		const clipPath = [
			`circle(0px at ${x}px ${y}px)`,
			`circle(${endRadius}px at ${x}px ${y}px)`
		]
		document.documentElement.animate(
			{
				clipPath: dark.value ? [...clipPath].reverse() : clipPath
			},
			{
				duration: 300,
				easing: 'ease-in',
				pseudoElement: dark.value
					? '::view-transition-old(root)'
					: '::view-transition-new(root)'
			}
		)
	})
}
</script>
<style lang="less">
.right-container {
	margin-left: v-bind(leftWidth);
	transition: all 0.5s;
}
</style>
