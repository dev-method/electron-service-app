/*jshint esversion: 6 */
/* jshint node: true */
const webpack = require('webpack');
module.exports = [{
     target: "electron-renderer",
     entry: './components/screens/dev/authWindow.js',
     output: {
         path: './components/screens/prod/',
         filename: 'authWindow-prod.js',
     },
	 module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
 },
    {
        target: "electron-renderer",
        entry: './components/screens/dev/logsWindow.js',
        output: {
            path: './components/screens/prod/',
            filename: 'logsWindow.js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                }
            ]
        }
    },
    {
        target: "electron-renderer",
        entry: './components/screens/dev/mainWindow.js',
        output: {
            path: './components/screens/prod/',
            filename: 'mainWindow.js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                }
            ]
        }
    },
    {
        target: "electron-renderer",
        entry: './components/screens/dev/menuWindow.js',
        output: {
            path: './components/screens/prod/',
            filename: 'menuWindow.js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                }
            ]
        }
    },
    {
        target: "electron-renderer",
        entry: './components/screens/dev/startWindow.js',
        output: {
            path: './components/screens/prod/',
            filename: 'startWindow.js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                }
            ]
        }
    },

];
