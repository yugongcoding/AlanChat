import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueSocketIO from 'vue-socket.io'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
axios.defaults.withCredentials = true

Vue.prototype.$axios = axios
const baseUrl = 'http://127.0.0.1:5000/'
// const baseUrl = "http://www.skj.kim:50008/";
axios.defaults.baseURL = baseUrl + 'alan-api'
Vue.use(ElementUI)
// Vue.use(vueConfig);

Vue.use(new VueSocketIO({
  debug: true,
  connection: baseUrl,
  vuex: {
    store,
    actionPrefix: 'SOCKET_', // 为vuex设置的两个前缀
    mutationPrefix: 'SOCKET_'
  },
  options: { path: '/socket.io/' } // Optional options
})
)
router.beforeEach(function(to, from, next) {
  if (to.meta.needLogin) {
    axios.get('/judgeLoginStatus').then(response => {
      var login = response.data
      console.log(login)
      if (login === true) {
        next()
        // }
      } else {
        next('/login')
      }
    })
  } else {
    next()
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
