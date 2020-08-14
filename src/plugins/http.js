// 插件模块
import axios from 'axios'

const MyHttpSever = {}

MyHttpSever.install = (Vue) => {
  axios.defaults.baseURL = 'http://81.68.112.168:3002/api/private/v1/'
  // 添加实例方法
  Vue.prototype.$http = axios
}

export default MyHttpSever
