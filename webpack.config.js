// const path = require("path");
// const webpack = require("webpack");
// const withPlugins = require("next-compose-plugins");
// const withImages = require("next-images");
// const nextConfiguration = {
//   webpack(config) {
//     // url loader
//     config.module.rules.push({
//       test: /\.(png|jpg|gif|svg)$/,
//       include: [
//         path.resolve(
//           __dirname,
//           "/node_modules/react-casino/dist/assets/png/cards/"
//         ),
//       ],
//       use: {
//         loader: "url-loader",
//       },
//     });

//     return config;
//   },
// };

// module.exports = withImages(nextConfiguration);

export const module = {
  rules: [
    {
      test: /\.(png)$/i,
      include: "./node_modules",
      loader:
        "file-loader?name=./node_modules/react-casino/dist/assets/png/cards/AS.png",
    },
  ],
};
