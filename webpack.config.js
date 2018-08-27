const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: ['./src/js/index.js', './src/scss/style.scss', './src/index.html'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/index_bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader' 
                    },
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          // you can specify a publicPath here
                          // by default it use publicPath in webpackOptions.output
                          publicPath: './dist/css'
                        }
                      },
                    {
                        loader: 'css-loader',
                    }
                ],  
            },
            {
                test: /\.scss$/,
                use: [

                process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,

                {
                    loader: "css-loader",
                    options: {
                        includePaths: ["./src/css/style.css"],             
                    }
                }, 
                {
                    loader: "sass-loader",
                    options: {
                        includePaths: ["./src/scss/style.scss"],
                    }
                },      
            ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'    
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css",
        })
    ]
}