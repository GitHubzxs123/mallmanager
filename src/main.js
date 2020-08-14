// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import MyHttpSever from '@/plugins/http.js'
import '@/assets/css/reset.css'
import App from './App'
import router from './router'
import moment from 'moment'

Vue.use(ElementUI)
Vue.use(MyHttpSever)
Vue.config.productionTip = false

// 全局过滤器 管理日期格式 提前安装moment
Vue.filter('fmtdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
