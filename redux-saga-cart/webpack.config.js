const webpack = require('webpack');
const path = require('path');
module.exports = {
    module: {
        loaders: [
            {
                loader: "babel-loader",
                exclude: [
                    /(node_modules)/,
                ],
                query: {
                    presets: ['es2015','react'],
                    plugins: ['transform-object-rest-spread']
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
            'process.env.HOST': JSON.stringify(process.env.HOST || 'localhost'),
        })
    ],
    entry: {
        "index": [
            'babel-regenerator-runtime',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
            './'
        ]
    },
    output: {
        path: path.resolve(__dirname, "public"),
        publicPath: "/assets/",
        filename: "[name].bundle.js"
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    devtool: 'source-map',
    node: {
      process: false
    }
};
