module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  plugins: ['react'],
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
    'global-require': 0
  },
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module'
  }
}
