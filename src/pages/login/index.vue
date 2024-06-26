<template>
	<div class="w-full h-screen login-bg">
		<div class="w-90 custom-div bg-base">
			<v-form
				ref="formRef"
				:labelCol="{ span: 4 }"
				:wrapperCol="{ span: 20 }"
				:hideRequiredMark="true"
				:model="form"
			>
				<h3 class="login-title">若依后台管理系统</h3>
				<v-form-item label="账号" :span="24" required name="username">
					<a-input v-model:value="form.username"></a-input>
				</v-form-item>
				<v-form-item label="密码" :span="24" required name="password">
					<a-input-password v-model:value="form.password"></a-input-password>
				</v-form-item>
				<v-form-item
					label="验证码"
					:span="24"
					class="verify"
					required
					name="code"
				>
					<a-input
						v-model:value="form.code"
						class="w-70%"
						@pressEnter="handleLogin"
					></a-input>
					<img
						v-if="imgUrl"
						:src="imgUrl"
						alt=""
						style="margin-left: 5px"
						@click="getCaptcha"
						class="h-32px"
					/>
					<a-spin v-else class="w-18%" />
				</v-form-item>
				<a-col class="mb-20px" :span="24">
					<a-checkbox v-model:checked="remember">记住密码</a-checkbox>
				</a-col>
				<a-col :span="24">
					<a-button
						class="text-center"
						block
						type="primary"
						size="large"
						:loading="loading"
						@click="handleLogin"
						>{{ loading ? '登录中...' : '登录' }}</a-button
					>
				</a-col>
			</v-form>
		</div>
	</div>
</template>

<script setup lang="ts" name="login">
import { ref, onMounted } from 'vue'
import { getCaptchaImage } from '@/pages/login/api/index'
import { LoginForm } from '@/pages/login/types/index'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { login } from '@/pages/login/api/index'
import { message } from 'ant-design-vue'
import { setToken } from '@/utils/system'
import { storeToRefs } from 'pinia'

const form = ref<LoginForm>({
	username: '',
	password: '',
	uuid: '',
	code: ''
})

const imgUrl = ref('')

const remember = ref(false)

const getCaptcha = async () => {
	form.value.uuid = ''
	imgUrl.value = ''
	const { uuid, img } = await getCaptchaImage()
	form.value.uuid = uuid
	imgUrl.value = 'data:image/gif;base64,' + img
}

const loading = ref(false)
const formRef = ref()

const { token } = storeToRefs(useUserStore())
const router = useRouter()
const handleLogin = async () => {
	await formRef.value.validate()
	loading.value = true
	try {
		const res = await login(form.value)
		if (remember.value) {
			localStorage.setItem(
				'loginForm',
				JSON.stringify({ ...form.value, uuid: '', code: '' })
			)
		} else {
			localStorage.removeItem('loginForm')
		}
		token.value = res.token
		setToken(res.token)
		message.success('登录成功')
		router.push('/home')
	} catch (error) {
		getCaptcha()
	} finally {
		loading.value = false
	}
}

onMounted(() => {
	getCaptcha()
	const loginFormStr = localStorage.getItem('loginForm')
	if (loginFormStr) {
		const loginForm = JSON.parse(loginFormStr)
		form.value = loginForm
		remember.value = true
	}
})
</script>

<style scoped lang="less">
.custom-div {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 20px;
	border-radius: 6px;
}

.login-bg {
	background-image: url('/src//assets//img//login-background.jpg');
	background-size: cover;
}

.login-title {
	margin: 0 auto 30px auto;
	text-align: center;
	color: #707070;
}

.verify {
	::v-deep(.ant-form-item-control-input-content) {
		display: flex;
	}
}
</style>
