module.exports = api => {
  api.cache(false);

  const presets = [
    ["@babel/preset-env", {
      spec: true,
      debug: false,
      modules: 'cjs',
      useBuiltIns: 'usage',
      corejs: {
        version: 3,
        proposals: true,
      }
    }],
    "@babel/preset-react"
  ];

  const plugins = [
    ["@babel/plugin-proposal-class-properties"],
    ["@babel/plugin-transform-runtime"],
    ["import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: (paths) => `${paths.replace(/(.*)(row|col)$/, "$1grid")}/style/index`
    }]
  ];

  return {
    presets,
    plugins
  };
};
