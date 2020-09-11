module.exports = function (api) {
  api.cache(true);

  const presets = ['next/babel', '@babel/preset-react'];
  const plugins = [
    [
      'styled-components',
      {
        ssr: true,
      }
    ],
    ['flow-react-proptypes', {deadCode: true, useESModules: true}],
    '@babel/plugin-proposal-optional-chaining'
  ];

  return {
    presets,
    plugins,
  };
};
