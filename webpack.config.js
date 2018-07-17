const path = require('path');

const config = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, '/build/js/'),
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /jquery\.js$/,
                loader: 'expose-loader?$!expose-loader?jQuery'
            }
        ]
    }
};

module.exports = config;
