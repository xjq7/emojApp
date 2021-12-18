module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: ['plugin:prettier/recommended', '@react-native-community'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react-hooks/exhaustive-deps': 'warn',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [0],
  },
};
