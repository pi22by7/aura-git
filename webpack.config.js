module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              throwIfNamespace: false,
            },
          },
          {
            loader: "url-loader",
            options: {
              limit: 8192, // or any other limit
              name: "[name].[hash:7].[ext]",
              outputPath: "images/",
            },
          },
        ],
      },
    ],
  },
};
