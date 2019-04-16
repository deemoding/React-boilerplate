module.exports = api => {
  api.cache(false);

  const presets = [
    ["@babel/preset-env", {
      "targets": {
        "chrome": 60,
        "firefox": 60
      },
      "spec": true,
      "debug": false
    }],
    "@babel/preset-react"
  ];

  const plugins = [
    ["@babel/plugin-proposal-class-properties"],
    ["@babel/plugin-transform-runtime"],
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": (paths) => `${paths.replace(/(.*)(row|col)/, "$1grid")}/style/index`
    }]
  ];

  return {
    presets,
    plugins
  };
};
