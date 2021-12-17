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
          '@services': './src/services',
          '@atom': './src/atom',
          '@lib': './src/lib',
          '@assets': './src/assets',
        },
      },
    ],
  ],
};
