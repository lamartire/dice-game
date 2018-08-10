import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import SimpleProgressWebpackPlugin from 'simple-progress-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
// import VueLoaderPlugin from 'vue-loader/lib/plugin'

/**
 * Paths
 */
const ENV = process.env.NODE_ENV || 'development'
const PORT = process.env.PORT || 8080
const SOURCE_PATH = path.resolve(__dirname, './src')
const PUBLIC_PATH = path.resolve(__dirname, './public')
const DIST_PATH = path.resolve(__dirname, './dist')

/**
 * Base configuration
 */
const config = {
  mode: ENV,

  output: {
    path: DIST_PATH,
    publicPath: '/',
    filename: ENV === 'development' ? 'js/[name].js' : 'js/[name].js?[hash:16]',
  },

  watch: ENV === 'development',

  watchOptions: {
    aggregateTimeout: 100,
  },

  devtool: ENV === 'development' && '#inline-source-map',

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NodeEnvironmentPlugin('NODE_ENV'),
    new SimpleProgressWebpackPlugin({
      format: ENV === 'development' ? 'minimal' : 'compact',
    }),
    new ExtractTextPlugin({
      filename: ENV === 'development' ? 'main.css' : 'main.css?[hash:16]',
      allChunks: true,
      disable: ENV === 'development',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(PUBLIC_PATH, './index.html'),
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(ENV),
    }),
    // new VueLoaderPlugin(),
    new ExtractTextPlugin({
      filename:
        ENV === 'development' ? 'css/main.css' : 'css/main.css?[hash:16]',
      disable: ENV === 'development',
      allChunks: true,
    }),
    new FaviconsWebpackPlugin(path.resolve(PUBLIC_PATH, './favicon.png')),
  ],

  resolve: {
    modules: ['node_modules', SOURCE_PATH],
    extensions: ['.js', '.vue', '.css'],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      },
    },
  },

  devServer: {
    port: PORT,
    contentBase: DIST_PATH,
    hot: true,
    historyApiFallback: true,
    open: true,
  },

  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: [/node_modules/, /\.spec.js$/],
        include: [SOURCE_PATH],
      },

      {
        loader: 'vue-loader',
        test: /\.vue$/,
      },

      {
        loader: 'url-loader',
        test: /\.(png|jpe?g|svg|ttf|eot|woff|woff2)$/,
        options: {
          limit: 8000,
        },
      },
    ],
  },
}

if (ENV === 'development') {
  config.module.rules.push({
    test: /\.css$/,
    loaders: ['vue-style-loader', 'css-loader', 'postcss-loader'],
  })

  config.plugins.push(
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    })
  )
}

if (ENV === 'production') {
  config.module.rules.push({
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'vue-style-loader',
      use: 'css-loader?importLoaders=1&minimize=1!postcss-loader',
    }),
  })
}

export default config
