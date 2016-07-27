/**
 * Created by yuan on 2016/1/15.
 */


var path = require('path');
var webpack = require('webpack');

var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

// ����htmlģ��
var HtmlWebpackPlugin = require("html-webpack-plugin");
// ������ʽ�ļ�
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var node_modules = path.resolve(__dirname, 'node_modules');



module.exports = {
    entry: [
        path.resolve(__dirname, './main.js')
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "[name].[hash:8].js",
        publicPath: '/'
    },
    resolve: {
        extension: ['', '.jsx', '.js', '.json'],
        // ���webpack�������ٶ�
        alias: { }
    },
    devtool: 'source-map',
    'display-error-details': true,
    // ʹ��externals���Խ�react���룬Ȼ����<script>������react����
    externals: [],
    loaders: [
        {
            test: /\.js[x]?$/,
            loaders: ['react-hot', 'babel'],
            exclude: path.resolve(__dirname, 'node_modules')
        },
        {
            test: /\.css/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        },
        {
            test: /\.less/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
        },
        {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=8192'
        },
        {
            test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000"
        }
    ],
    plugins: [
        new ExtractTextPlugin("main.[hash:8].css", {
            allChunks: true,
            disable: false
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[hash:8].js'),
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            title: 'your app title',
            template: './app/index.html',
        }),
        new webpack.optimize.MinChunkSizePlugin({
            compress: {
                warnings: false
            }
        }),
        // ������Ȼ���Ƶ�ģ�飬�������������ɵ��ļ��г����ظ���ģ��
        new webpack.optimize.DedupePlugin(),
        // ������Ƶ�������� ID���Ա�ﵽ�����ļ���С��Ч��
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin({
            minSizeReduce: 1.5,
            moveToParents: true
        }),
    ]
}