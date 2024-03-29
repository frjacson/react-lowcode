const CracoLessPlugin = require("craco-less");
const path = require("path");
const pathResolve = (pathUrl) => path.join(__dirname, pathUrl);

module.exports = {
  webpack: {
    alias: {
      "@": pathResolve("src"),
    },
  },
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
