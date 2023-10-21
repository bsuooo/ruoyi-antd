module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true // 添加 node 环境
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-essential',
		'plugin:prettier/recommended'
	],
	overrides: [
		{
			files: ['.eslintrc.{js,cjs}'],
			env: {
				node: true
			},
			parserOptions: {
				sourceType: 'script'
			}
		}
	],
	parserOptions: {
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint', 'vue', 'prettier'],
	rules: {
		'vue/multi-word-component-names': 'off',
		'@typescript-eslint/no-explicit-any': 'off'
	}
}
