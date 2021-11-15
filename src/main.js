import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Chart from 'vue2-frappe'

Vue.use(Chart)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
