import Vue from 'vue'
import App from './App.vue'
import { MdField, MdButton } from 'vue-material/dist/components'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false
Vue.use(MdField);
Vue.use(MdButton);

new Vue({
  render: h => h(App),
}).$mount('#app')
