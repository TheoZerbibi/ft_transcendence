module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	parser: 'vue-eslint-parser',
	extends: [
		'plugin:vue/base',
		'eslint:recommended',
		'plugin:vue/vue3-recommended',
		'plugin:vue/essential',
		'plugin:@typescript-eslint/recommended',
		'eslint-config-prettier',
	],
	parserOptions: {
		ecmaVersion: 2023,
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
		createDefaultProgram: true,
		project: ['./tsconfig.app.json', './tsconfig.node.json', './tsconfig.vitest.json', './volar.config.js'],
		extraFileExtensions: ['.vue'],
		tsconfigRootDir: __dirname,
	},
	plugins: ['import', 'tsdoc', 'html', 'vue'],
	rules: {
		indent: ['error', 'tab'],
		'import/order': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'no-tabs': [0],
		'require-jsdoc': 'warn',
		'no-unused-vars': 'warn',
		'@typescript-eslint/array-type': [
			'error',
			{
				default: 'array',
			},
		],
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/consistent-generic-constructors': ['error', 'type-annotation'],
		'@typescript-eslint/consistent-type-imports': [
			'off',
			{
				prefer: 'type-imports',
			},
		],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-confusing-void-expression': [
			'error',
			{
				ignoreArrowShorthand: true,
			},
		],
		'@typescript-eslint/strict-boolean-expressions': 'off',
		'@typescript-eslint/triple-slash-reference': 'off',
		'import/default': 'off',
		'import/no-default-export': 'off',
		'import/order': [
			'error',
			{
				groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
				pathGroups: [
					{
						pattern:
							'{vue,vue-router,vuex,@/store,vue-i18n,pinia,vite,vitest,vitest/**,@vitejs/**,@vue/**,@logue/vue2-helpers}',
						group: 'external',
						position: 'before',
					},
					{
						pattern: '{vuetify,vuetify/**,@mdi/**,webfontloader}',
						group: 'parent',
						position: 'before',
					},
					{
						pattern: '{@/**}',
						group: 'internal',
						position: 'before',
					},
				],
				pathGroupsExcludedImportTypes: ['builtin'],
				alphabetize: {
					order: 'asc',
				},
				'newlines-between': 'always',
			},
		],
		'tsdoc/syntax': 'warn',
		'vue/html-self-closing': [
			'error',
			{
				html: {
					void: 'always',
				},
			},
		],
		'vue/multi-word-component-names': 'warn',
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
			'vue-eslint-parser': ['.vue'],
		},
		'import/resolver': {
			typescript: true,
			alias: {
				map: [
					['@', './src'],
					['~', './node_modules'],
				],
				extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue'],
			},
		},
		vite: {
			configPath: './vite.config.ts',
		},
	},
};
