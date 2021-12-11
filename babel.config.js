module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@pages': './src/pages',
          '@components': './src/components',
          '@navigation': './src/navigation',
          '@utils': './src/utils',
        },
      },
    ],
    [
      'react-native-stylename-to-style',
      {
        extensions: ['css', 'scss', 'sass'],
      },
    ],
    [
      'react-native-platform-specific-extensions',
      {
        extensions: ['css', 'scss', 'sass'],
      },
    ],
  ],
};
