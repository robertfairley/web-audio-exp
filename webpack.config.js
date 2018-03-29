const path = require('path');

const config = {
        entry: './src/index.js',
        output: {
                filename: 'app.js',
                path: path.resolve(__dirname)
        },

        module: {
                rules: [
                        { test:/\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
                ]
        },

        resolve: {
                extensions: ['.js']
        },

}

module.exports = config;

