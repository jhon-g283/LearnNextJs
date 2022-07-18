/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  webpack:function(config){
      
      config.module.rules.push({
          test:/\.md$/,
          use:"raw-loader",

      })

      return config
  
  },
  entry: './www/src/sample/app.jsx',
    output: {
        path: './www/sample/dist',
        filename: 'bundle.js'
    },

  module: {
    loaders: [
       {
         test: /\.(js|jsx)$/,
         loader: 'babel',
         exclude: /node_modules/,
         query: {
           presets: ["es2015", "react"],
         }
       },
       {
         test: /\.css$/,
         loaders: ['style', 'css?modules'],
       }
    ]
}
     


}