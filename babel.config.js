module.exports = function (api) {
  api.cache(true);
  // Load nativewind/babel which returns a config object containing plugins
  const nativewindBabel = require("nativewind/babel")();
  return {
    presets: ["babel-preset-expo"],
    plugins: [...(nativewindBabel.plugins || [])],
  };
};
