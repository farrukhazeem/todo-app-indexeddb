module.exports = {
    entry: ['babel-polyfill', __dirname + '/src/index.js'],
    context: __dirname + "/src",
    output: {
        path: __dirname + '/dist',
        filename: 'app.bundle.js',
    },
    module: {
        loaders: [ { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/,
        query: {
          "presets": ["latest", "react", "stage-0", "es2015"],
          "plugins": ["syntax-async-functions","transform-regenerator"]
          }
        },
          { test: /\.scss$/, loaders: [ 'style-loader', 'css-loader', 'sass-loader' ] }]
    }
}
