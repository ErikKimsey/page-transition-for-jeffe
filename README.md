# Webpack 4 Tutorial

## TL;DR

If you only want to use this webpack 4 configuration and dont want to know how to implement it, well just clone this repo and start develop.

1. `git clone https://github.com/finmavis/webpack-4-boilerplate.git`
2. Navigate to folder you just clone
3. Install all Dependencies, `yarn` or `npm install`
4. Then for development just run the script `yarn start` or `npm run start`
5. To build for production just run the script `yarn build` or `npm run build`, it will generate folder **build**.

## Getting Started
- initial your project
- **npm init** or **yarn init**
- Create **config** and **src** folder
- Create **webpack.config.js** inside **config** folder
- Create **index.html** and **index.js** inside **src** folder
- Install **webpack webpack-cli webpack-dev-server** as development dependencies

  - **index.html**
  ```
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>Webpack 4 Boilerplate</title>
  </head>
  <body>
    <h1>Webpack 4 boilerplate</h1>
  </body>
  </html>
  ```

  - **index.js**
  ```
  const tes = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve("Hello World"), 2000);
    });
  }

  tes()
    .then(value => console.log(value));
  ```

## Support ES6 and Beyond

- Install **@babel/core @babel/preset-env babel-loader** as devDependencies
- Install **@babel/polyfill** and **core-js@3** as dependencies

These are the packages we will be using :

- **@babel/core**
  This package, as the name would suggest, is the core package. The package is responsible for compiling javascript code and outputting usable code. By default it uses your local configuration, but we will get into that later on.

- **@babel/preset-env**
  Knowing what browser supports what javascript feature is essential in transforming your code. Here is where preset-env comes in. It handles what transforms should be applied, based on your own input. You tell Babel: “I need support for these browsers” and it will transform your javascript so it will work on the list you provide.

- **@babel/polyfill**
  Sometimes the browsers you want to support need a little extra help for certain features. @babel/polyfill will provide polyfills for those featured, based on what browsers you wish to support.

- **babel-loader**
  Since we will be using Webpack, this package allows us to transpile our code using Babel and Webpack.

- **core-js@3**
  It is a polyfill of the JavaScript standard library, which supports: The latest ECMAScript standard.

* Create file **.babelrc** and fill it with :

  ```
  {
    "presets": [
  	  ["@babel/preset-env", {
        "useBuiltIns": "usage",
  	    "debug": true,
        "corejs": 3
  	  }]
  	]
  }
  ```

* Then add your target browser you want to support in `package.json`. <br>
  Note: you can check browserlist [Here](https://browserl.ist/) <br>
  In this case we will use this configuration :

  ```
  "browserslist": [
    "> 1%",
    "not ie <= 9",
    "last 3 versions"
  ]
  ```

* Let's use babel with webpack, create **webpack.config.js** file inside **config** folder, and code inside file is

  ```
  const path = require("path");

  module.exports = {
    entry: {
      main: './src/index.js'
    },
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: 'main.bundle.js'
    },
    mode: 'development',
    devServer: {
      contentBase: path.join(__dirname, '../build'),
      compress: true,
      port: 3000,
      overlay: true,
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },
  };
  ```

## Auto Inject your bundle code to HTML

Install **html-webpack-plugin** as devDependencies

- **html-webpack-plugin**
  This is a webpack plugin that simplifies creation of HTML files to serve your webpack bundles. This is especially useful for webpack bundles that include a hash in the filename which changes every compilation.

- Open **webpack.config.js** and add :

  ```
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.export = {
    // ... others configuration,
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html'
      })
    ]
  }
  ```

- Open **package.json** and add script for webpack to compile
  ```
  "scripts": {
    "start": "webpack-dev-server --open --config=config/webpack.config.js"
  },
  ```

- Now you can start your `development` by running `npm start` or `yarn start`

## Support CSS

Install **style-loader css-loader mini-css-extract-plugin** as devDependencies

- **style-loader**
  This package will Adds CSS to the DOM by injecting a `<style>` tag

- **css-loader**
  This package will interprets @import and url() like import/require() and will resolve them.

- **mini-css-extract-plugin**
  This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps.

- Open **webpack.config.js** and add to module.rules :

  ```
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');

  {
    test: /\.css$/,
    use: [
      'style-loader',
      MiniCssExtractPlugin.loader,
      'css-loader'
    ]
  }
  ```

  And at Plugin add

  ```
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ]
  ```

## Support SASS/SCSS

Install **node-sass sass-loader** as devDependencies

- **node-sass**
  Node-sass is a library that provides binding for Node.js to LibSass, the C version of the popular stylesheet preprocessor, Sass. It allows you to natively compile .scss/.sass files to css at incredible speed and automatically via a connect middleware. And in this case this package is `peerDependencies` of our sass-loader

- **sass-loader**
  Loads a Sass/SCSS file and compiles it to CSS for webpack.

- Change a little bit css module like this

  ```
  {
    test: /\.(sa|sc)ss$/,
    use: [
      'style-loader',
      MiniCssExtractPlugin.loader,
      'css-loader',
      'sass-loader'
    ]
  }
  ```

## Add PostCSS

install **postcss-loader postcss-preset-env cssnano** as devDependencies

- **postcss-loader**
  Loader for webpack to process CSS with PostCSS

- **postcss-preset-env**
  PostCSS Preset Env lets you convert modern CSS into something most browsers can understand, determining the polyfills you need based on your targeted browsers or runtime environments, using [cssdb](https://cssdb.org/). Also you can check [Can I Use](https://caniuse.com) for browserlist.

- **css-nano**
  cssnano takes your nicely formatted CSS and runs it through many focused optimisations, to ensure that the final result is as small as possible for a production environment.

- create **postcss.config.js** for PostCSS Config

  ```
  module.exports = {
    plugins: [
      require('postcss-preset-env')(),
      require('cssnano')(),
    ]
  }
  ```

- Add postcss to your `css`, `sass` and `scss` loader

  ```
  {
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
      'style-loader',
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
    ],
  },
  {
    test: /\.(sa|sc)ss$/,
    exclude: /node_modules/,
    use: [
      'style-loader',
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
      'sass-loader',
    ],
  },
  ```

## Caching and Hashing

- install **webpack-md5-hash** as devDependencies
- Edit output point of your js :

  ```
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].[chunkhash].js',
  },
  ```

  And in plugin css

  ```
  new MiniCssExtractPlugin({
    filename: 'style.[contenthash].css',
  }),
  ```

  Add new plugin

  ```
  const WebpackMd5Hash = require('webpack-md5-hash');

  plugins: [
    new WebpackMd5Hash()
  ]
  ```

## Keep Clean and Fresh

- install **clean-webpack-plugin** as devDependencies

  ```
  const CleanWebpackPlugin = require('clean-webpack-plugin');

  plugins: [
    new CleanWebpackPlugin(['dist', 'build'], {
      root: path.resolve(__dirname, '../'),
    })
  ]
  ```

## Support images file
  - will be added soon

## Support HTML Reference
  - will be added soon

## Optimization
  - Will be added soon

## Separate Development and Production

- Create 2 webpack configuration

  - **config/webpack.dev.js** for Development Mode
  - **config/webpack.prod.js** for Production and optimized

- Separate your code

  - **webpack.dev.js**

  ```
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const WebpackMd5Hash = require('webpack-md5-hash');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const CompressionPlugin = require('compression-webpack-plugin');

  module.exports = {
    entry: {
      main: './src/index.js',
    },
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: '[name].[chunkhash].js',
    },
    mode: 'development',
    devServer: {
      contentBase: path.join(__dirname, '../build'),
      compress: true,
      port: 3000,
      overlay: true,
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.(sa|sc)ss$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'assets/images/',
              },
            },
          ],
        },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'link:href', ':data-src'],
              minimize: true,
            },
          },
        },
      ],
    },
    plugins: [
      // CleanWebpackPlugin will do some clean up/remove folder before build
      // In this case, this plugin will remove 'dist' and 'build' folder before re-build again
      new CleanWebpackPlugin(['dist', 'build'], {
        root: path.resolve(__dirname, '../'),
      }),
      // The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),
      new WebpackMd5Hash(),
      // ComppresionPlugin will Prepare compressed versions of assets to serve them with Content-Encoding.
      // In this case we use gzip
      // But, you can also use the newest algorithm like brotli, and it's supperior than gzip
      new CompressionPlugin({
        algorithm: 'gzip',
      }),
    ],
  };

  ```

  - **webpack.prod.js**

  ```
  const path = require('path');
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const CompressionPlugin = require('compression-webpack-plugin');
  const TerserJSPlugin = require('terser-webpack-plugin');
  const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
  const BrotliPlugin = require('brotli-webpack-plugin');

  module.exports = {
    entry: {
      main: './src/index.js',
    },
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: '[name].bundle.js',
    },
    mode: 'production',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.(sa|sc)ss$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'assets/images/',
              },
            },
          ],
        },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'link:href', ':data-src'],
              minimize: true,
            },
          },
        },
      ],
    },
    optimization: {
      minimizer: [
        new TerserJSPlugin({}),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
    plugins: [
      // CleanWebpackPlugin will do some clean up/remove folder before build
      // In this case, this plugin will remove 'dist' and 'build' folder before re-build again
      new CleanWebpackPlugin(['dist', 'build'], {
        root: path.resolve(__dirname, "../"),
      }),
      // This plugin will extract all css to one file
      new MiniCssExtractPlugin({
        filename: 'style.min.css',
      }),
      // The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),
      // ComppresionPlugin will Prepare compressed versions of assets to serve them with Content-Encoding.
      // In this case we use gzip
      // But, you can also use the newest algorithm like brotli, and it's supperior than gzip
      new CompressionPlugin({
        algorithm: 'gzip',
      }),
    ],
  };
  ```

- Edit script to your package.json to look like this, and remove others scripts

  ```
  "scripts": {
    "start": "webpack-dev-server --open --config=config/webpack.dev.js",
    "build": "webpack --config=config/webpack.prod.js"
  },
  ```

- Now delete your **webpack.config.js** because we already use separate configuration
