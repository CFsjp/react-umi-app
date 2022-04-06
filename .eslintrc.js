module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint'), 'plugin:jsdoc/recommended',],
  plugins: ['react', 'jsdoc'],
  rules: {
    'import/order': ['off'],
    'import/newline-after-import': ['off'],
    'space-before-function-paren': ['error', 'never'],
    'space-before-blocks': ['error', 'always'],
    'space-infix-ops': ['error'],
    'max-classes-per-file': ['error', 2],
    'no-plusplus': ['off'],
    'object-curly-spacing': ['error', 'always'],
    'comma-spacing': ['error', { after: true }],
    'no-underscore-dangle': ['off'],
    'no-bitwise': ['off'],
    'no-param-reassign': ['off'],
    'consistent-return': ['off'],
    '@typescript-eslint/consistent-indexed-object-style': ['off'],
    '@typescript-eslint/consistent-type-imports': ['off'],
    '@typescript-eslint/no-confusing-non-null-assertion': ['off'],
    '@typescript-eslint/no-loop-func': ['off'],
    '@typescript-eslint/no-redeclare': ['off'],
    '@typescript-eslint/no-shadow': ['off'],
    '@typescript-eslint/no-use-before-define': ['off'],
    '@typescript-eslint/typedef': ['off'],
    '@typescript-eslint/no-unused-expressions': ['off'],
    'global-require': 0,
    // 上面是js或者ts规则，下面是jsdoc规则

    // *号必须按标准对齐
    "jsdoc/check-alignment": 1, // Recommended
    // 检测example中的js代码是否符合eslint规则
    "jsdoc/check-examples": 1,
    // 检测无效的填充块
    "jsdoc/check-indentation": 1,
    // 检测param的名称是否与函数中的参数名称一致
    "jsdoc/check-param-names": 1, // Recommended
    "jsdoc/check-syntax": 1,
    // 检测块标记名称是否正确，例如@paramsss是错误的
    "jsdoc/check-tag-names": 1, // Recommended
    // 检测参数类型是否正确，例如{object},可自动修复大小写
    "jsdoc/check-types": 1, // Recommended
    "jsdoc/implements-on-classes": 1, // Recommended
    // 通过正则表达式限制描述的内容
    // 强制描述的内容后面必须有一个空行，也可以配置没有
    "jsdoc/no-types": 1,
    // 不允许出现未定义的参数类型，例如{strrrrr}
    "jsdoc/no-undefined-types": 1, // Recommended
    // 要求所有函数都要有描述
    "jsdoc/require-description": ["error", {"descriptionStyle":"any"}],
    "jsdoc/require-returns": 0,
    // 验证类型的有效性
    "jsdoc/valid-types": 1 // Recommended
  },
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module'
  }
}
