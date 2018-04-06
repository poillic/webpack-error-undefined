const path = require("path");
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require("webpack");
const ExtractText = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
	entry : "./src/index.js",
	devtool : "inline-source-map",
	devServer : {
		contentBase : './dist',
		historyApiFallback : true,
		inline : true,
		hot : true
	},
	module : {
		rules : [
			{
				test : /\.less$/,
				use: ['css-hot-loader'].concat( ExtractText.extract({
					fallback: 'style-loader',
					use: [{loader:'css-loader', options: { minimize : true }}, 'less-loader', 'postcss-loader' ],
				} ) )
			}
		]
	},
	plugins : [
		new htmlWebpackPlugin({
			title : 'Output'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new cleanWebpackPlugin(),
		new ExtractText( "style.css" )
		,new BrowserSyncPlugin({
			host : 'localhost',
			port : 3000,
			proxy: 'http://localhost:8080/'
		},
		{
			reload: false
		})
	],
	output : {
		filename : "bundle.js",
		path : path.resolve( __dirname, "dist" )
	}
};