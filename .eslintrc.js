module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: ['standard', 'prettier'],
  // required to lint *.vue files
  plugins: ['html', 'vue'],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}

// prettier 参考文档 https://prettier.io/docs/en/options.html?spm=a2c4e.11153940.blogcont422690.11.5d0b5721zZ3CkZ
// module.exports = {
//   printWidth: 80, // 每行代码长度（默认80）
//   tabWidth: 2, // 每个tab相当于多少个空格（默认2）
//   useTabs: false, // 是否使用tab进行缩进（默认false）
//   semi: false, // 声明结尾使用分号(默认true)
//   singleQuote: false, // 使用单引号（默认false）
//   trailingComma: 'all', // 多行使用拖尾逗号（默认none）
//   bracketSpacing: true, // 对象字面量的大括号间使用空格（默认true）
//   jsxBracketSameLine: true, // 多行jsx中的>放置在最后一行的结尾，而不是另起一行（默认false）
//   arrowParens: 'avoid' // 只有一个参数的箭头函数的参数是否带圆括号（默认avoid）
// };
