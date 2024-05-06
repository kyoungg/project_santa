module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'eslint:recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  varsIgnorePattern: '^_',
  argsIgnorePattern: '^_',

  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint', 'prettier'],
  rules: {
    'no-unused-vars': 'off',
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
