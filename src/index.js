import Vue from 'vue'
import App from './app.vue'

import './assets/styles/global.css'

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

//[1]引入依赖
import Axios from 'axios'
//[2]添加默认请求地址
Axios.defaults.baseURL = 'http://127.0.0.1:8080/news/'

//拦截器：在每一次请求发送前都会被拦截
Axios.interceptors.request.use(function(config){
    Mint.Indicator.open()
    return config//返回没有修改的配置，如果返回false或者不返回config就是直接拦截请求了
})

//拦截器：再响应回来之后被拦截
Axios.interceptors.response.use(function(config){

    Mint.Indicator.close()
    return config
})

//[3]给Vue原型挂载一个属性
Vue.prototype.$axios = Axios

const root = document.createElement("div")
document.body.appendChild(root)

new Vue({
    render:(h) => h(App)
}).$mount(root)