//使用webpack打包前端资源
const path = require("path")
const HTMLPlugin = require("html-webpack-plugin")
const webpack = require("webpack")

const isDev = process.env.NODE_ENV === 'development'

//把所有的资源（APP、Vue）打包成一个bundle.js，浏览器可以运行的js
const config = {
    target:'web',//告诉webpack-dev-server我们前端是个web
    entry: path.join(__dirname,'src/index.js'),
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.jsx$/,
                loader:'babel-loader'
            },
            {
                //添加css的打包规则
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.styl/,
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            sourceMap:true
                        }
                    },
                    'stylus-loader'
                ]
            },
            {
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,
                            name:'[name]-aaa.[ext]'
                        }
                    }
                ]

            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]
}

if(isDev){
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port:8000,
        //允许127.0.0.1和内网同时访问
        host:'0.0.0.0',
        //允许过程的错误打印在网页上
        overlay:{
            error:true,
        },
        //每次运行npm run dev ，自动打开网页
        //open:true,

        //不会重新加载整个页面，只会改动的组件内容
        hot:true
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = config