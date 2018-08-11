import Vue from 'vue'
import App from './App'
import element from 'element-ui'
import ru from 'element-ui/src/locale/lang/en'
import 'element-ui/lib/theme-chalk/display.css'

Vue.use(element, { locale: ru })

/* eslint-disable */
new Vue({
  el: '#mount-point',
  render: h => h(App),
})
