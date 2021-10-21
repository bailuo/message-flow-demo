const CracoLessPlugin = require("craco-less");

module.exports = {
  typescript: {
    enableTypeChecking: true,
  },
  plugins: [{ plugin: CracoLessPlugin }],
};
