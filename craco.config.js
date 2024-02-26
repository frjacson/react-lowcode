const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
        modifyLessRule: function () {
          return {
            test: /\.less$/,
            exclude: /node_modules/,
            use: [
              {
                loader: "style-loader",
              },
              {
                loader: "css-loader",
                options: {
                  modules: {
                    localIdentName: "[local].[hash:base64:6]",
                  },
                },
              },
              {
                loader: "less-loader",
              },
            ],
          };
        },
      },
    },
  ],
};
