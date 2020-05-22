module.exports = {
  root: true,
  env: {
    "node": true
  },
  extends: [
    "plugin:vue/essential",
    "@vue/airbnb"
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-plusplus": ["error",
      { "allowForLoopAfterthoughts": true } // 自增操作(++, --), 只在循环中使用
    ],
    "no-return-assign": ["error", "except-parens"],
    "max-len": 0, // 单行最大字符数
    "no-bitwise": 0, //禁用位操作
    "camelcase": 0,
    "arrow-parens": ["error", "as-needed"], // 箭头函数的括号: 按需
    "arrow-body-style": ["error", "as-needed"], // 箭头函数体大括号格式
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    "radix": ["error", "as-needed"], // parseInt() radix 参数可缺省
    "symbol-description": 0, // symbol 对象 description 参数
    "prefer-destructuring": 0, // 对象/数组 解构赋值
    "func-names": 0, // 匿名函数
  },
  parserOptions: {
    "parser": "babel-eslint"
  }
}
