/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
		ecmaVersion: 'latest',
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-typescript',
		'@vue/eslint-config-prettier/skip-formatting',
	],
	overrides: [
		{
			files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
			extends: ['plugin:cypress/recommended'],
		},
	],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		indent: ['error', 'tab'],
		'prettier/prettier': [2, { useTabs: true }],
		semi: ['error', 'always'],
		'no-tabs': 0,
		'linebreak-style': ['error', 'unix'],
		'no-throw-literal': 'error',
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/ban-types': [
			'error',
			{
				extendDefaults: true,
				types: {
					'{}': false,
				},
			},
		],
	},
};
