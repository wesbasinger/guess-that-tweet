module.exports = {
  entry: "./main.js",
  output: {
    path: './public',
    filename: "bundle.js"
  },
  module: {
  loaders: [
    {
      exclude: /node_modules/,
      loader: 'babel',
      query:
        {
          presets:['react', 'es2015']
        }
    }
  ]
  }
}
