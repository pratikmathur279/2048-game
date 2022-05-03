import path from 'path';
const __dirname = path.resolve();
import webpack from 'webpack';
import livereload from 'webpack-livereload-plugin';

const port = process.env.PORT || 3000;

var BUILD_DIR = path.resolve(__dirname, 'public/javascript');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
	mode: 'development',
	devtool: 'source-map',
	entry: APP_DIR + '/index.js',
	watch: true,
	output: {
		path: BUILD_DIR,
		filename: 'myapp.js',
		publicPath: '/'
	},
	devServer: {
		historyApiFallback: true,
	},
	optimization: {
		minimizer: [new livereload()],
	},

	module: {
		rules: [
			{
				test: /\.js?/,
				include: APP_DIR,
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			},
			{
				test: /\.svg$/,
				use: {
					loader: 'svg-url-loader'
				}
			}
		],
	}
};

export default config;