const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: './script.js',
  plugins: [
    new HtmlWebpackPlugin({
      title: "Roll-dice-webpack",
      template: "./LandingPage.html",
      filename: 'NewLandingPage.html'
  }),
  new HtmlWebpackPlugin({
    title: "Roll-dice-webpack",
    template: "./game.html",
    filename: 'NewGame.html',
    chunks: []
})
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
    
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
            {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                }
            }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
    ],
  },
 
};