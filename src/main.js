// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import axios from 'axios'
import Vue from 'vue'
import App from './App'
import router from './router'
import myHeader from './components/myHeader'
// import mySearch from './components/mySearch'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './theme/index.css'
// import './theme/element-variables.scss'

Vue.use(ElementUI)
Vue.component('myHeader',myHeader)
// Vue.component('mySearch',mySearch)
Vue.config.productionTip = false
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
  // render: h => h(App) //el中的示例
})
