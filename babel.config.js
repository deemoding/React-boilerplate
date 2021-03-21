module.exports = api => {
  api.cache(false);

  const presets = [
    ["@babel/preset-env", {
      spec: true,
      debug: false,
      // modules: false,
      useBuiltIns: 'usage',
      corejs: {
        version: '3',
        proposals: true,
      }
    }],
    ["@babel/preset-react", {
      runtime: 'automatic',
    }]
  ];

  const plugins = [
    ["@babel/plugin-proposal-class-properties"],
    // ["@babel/plugin-transform-runtime", {
    //   corejs: {
    //     version: 3,
    //     proposals: true,
    //   },
    // }],
    ["import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: (paths) => `${paths.replace(/(.*)(row|col)$/, "$1grid")}/style/index`
    }]
  ];

  return {
    presets,
    plugins,
    sourceType: 'unambiguous',
  };
};
