module.exports = api => {
  api.cache(false);

  const presets = [
    ["@babel/preset-env", {
      targets: {
        chrome: 60,
        firefox: 60,
        ie: 10
      },
      spec: true,
      debug: false,
      modules: 'cjs'
    }],
    "@babel/preset-react"
  ];

  const plugins = [
    ["@babel/plugin-proposal-class-properties"],
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": (paths) => `${paths.replace(/(.*)(row|col)$/, "$1grid")}/style/index`
    }]
  ];

  return {
    presets,
    plugins
  };
};
