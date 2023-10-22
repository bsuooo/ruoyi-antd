<template>
	<div class="w-full h-screen bg-white">
		<div class="w-160 h-100 custom-div">
			<v-form>
				<v-form-item label="账号" :span="24">
					<a-input v-model:value="form.user"></a-input>
				</v-form-item>
				<v-form-item label="密码" :span="24">
					<a-input-password v-model:value="form.password"></a-input-password>
				</v-form-item>
				<v-form-item label="验证码" :span="24">
					<a-input v-model:value="form.code" class="w-70%"></a-input>
					<img
						v-if="imgUrl"
						:src="imgUrl"
						alt=""
						@click="getCaptcha"
						class="h-32px"
					/>
					<a-spin v-else class="w-18%" />
				</v-form-item>
				<a-button class="text-center">登录</a-button>
			</v-form>
		</div>
	</div>
</template>

<script setup lang="ts" name="login">
import { ref, onMounted } from 'vue'
import { getCaptchaImage } from '@/pages/login/api/index'

type LoginForm = {
	user: string
	password: string
	uuid: string
	code: string
}

const form = ref<LoginForm>({
	user: '',
	password: '',
	uuid: '',
	code: ''
})

const imgUrl = ref('')

const getCaptcha = async () => {
	form.value.uuid = ''
	imgUrl.value = ''
	const { uuid, img } = await getCaptchaImage()
	form.value.uuid = uuid
	imgUrl.value = 'data:image/gif;base64,' + img
}

onMounted(() => {
	getCaptcha()
})
</script>

<style scoped>
.custom-div {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 20px; /* 可选：添加内边距以增加内容区域 */
}
</style>
