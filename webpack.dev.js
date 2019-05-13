import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
	mode: 'development',
	devtool: 'cheap-module-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'build'),
		compress: true,
		historyApiFallback: true, // This will make the server understand "/some-link" routs instead of "/#/some-link"
	},
	entry: path.join(__dirname,'src','index.js'),
	output: {
		path: path.join(__dirname,'build'),
		filename: 'index.bundle.js'
	  },
	  resolve: {
		modules: [path.resolve(__dirname, 'src'), 'node_modules']
	  },
	  module: {
		rules: [
		  {
			// this is so that we can compile any React,
			// ES6 and above into normal ES5 syntax
			test: /\.(js|jsx)$/,
			// we do not want anything from node_modules to be compiled
			exclude: /node_modules/,
			use: ['babel-loader']
		  },
		  {
			test: /\.(css|scss)$/,
			use: [
			  "style-loader", // creates style nodes from JS strings
			  "css-loader", // translates CSS into CommonJS
			  "sass-loader" // compiles Sass to CSS, using Node Sass by default
			]
		  },
		  {
			test: /\.(jpg|jpeg|png|gif|mp3|mp4|svg)$/,
			loaders: ['file-loader']
		  }
		]
	  },
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname,'public','index.html')
		})
	  ]
}
