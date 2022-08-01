const presets = ['module:metro-react-native-babel-preset'];
const plugins = [
  'bable-plugin-styled-components',
  'react-native-reanimated/plugin',
  [
    'module-resolver',
    {
      root: ['./src'],
      extensions: ['.js', '.json'],
      alias: {
        '~': './src',
      },
      cwd: 'babelrc',
    },
  ],
];

module.exports = {
  presets,
  plugins,
};
