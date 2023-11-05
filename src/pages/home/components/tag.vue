<template>
	<span
		class="color-white font-size-12px bg-blue p-4px ml-10px tab-list tab-list-active dark:bg-#262626"
		>首页</span
	>
</template>
<style scoped lang="less">
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
