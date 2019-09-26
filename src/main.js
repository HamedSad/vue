import Vue from 'vue'
import App from './App'
import store from './store/store'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,

}).$mount('#app')
