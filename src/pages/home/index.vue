<template>
	<div class="position-fixed left-0">
		<div
			class="h-50px flex flex-items-center flex-justify-center"
			:style="`width: ${leftWidth}px ;`"
		>
			<img src="/src//assets//img//logo.png" alt="" width="32" height="32" />
			<span>若依管理系统</span>
		</div>
		<a-menu
			id="dddddd"
			:style="`width: ${leftWidth}px; height: 100vh`"
			mode="inline"
		>
			<a-sub-menu key="sub1">
				<template #icon>
					<MailOutlined />
				</template>
				<template #title>Navigation One</template>
				<a-menu-item-group key="g1">
					<template #icon>
						<QqOutlined />
					</template>
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
		navbar
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const leftWidth = ref('220')
</script>
<style lang="less" scoped></style>
