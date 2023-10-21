<template>
	<div class="w-full h-screen bg-white flex justify-center items-center">
		<div class="w-200 h-100">
			<v-form>
				<v-form-item label="账号" :span="24">
					<a-input></a-input>
				</v-form-item>
				<v-form-item label="密码" :span="24">
					<a-input></a-input>
				</v-form-item>
			</v-form>
		</div>
	</div>
</template>

<script setup lang="ts" name="login"></script>

<style scoped></style>
