module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/standard', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  plugins: [
    // plugins 配置那些我们想要Linting规则的插件。
    'prettier', // eslint 会使用pretter的规则对代码格式化
  ],
  rules: {
    'prettier/prettier': 0, // 这项配置 对于不符合prettier规范的写法，eslint会提示报
    'space-before-function-paren': 0,
    indent: 0,
    'comma-dangle': 0,
    'no-trailing-spaces': 0,
    'eol-last': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
}
