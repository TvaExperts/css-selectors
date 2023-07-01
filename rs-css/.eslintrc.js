module.exports = {
  plugins: ['prettier', 'import', '@typescript-eslint', 'jest'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['.eslintrc.js', 'webpack.config.js', '*.test.ts'],
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  rules: {
    'import/extensions': 'off',
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'max-lines-per-function': ['error', 40],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/lines-between-class-members': 'off',
  },
};
