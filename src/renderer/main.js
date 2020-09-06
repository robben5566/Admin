import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import ftp from './api/ftp'
import firebase from './api/firebase'
import pwHash from './api/pwHash'
import mixin from './shared/mixin'
import VueMaterial from 'vue-material'
import _ from 'lodash'
import CKEditor from '@ckeditor/ckeditor5-vue'
import dateFns from 'date-fns'
import Q from 'q'
import 'jquery'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// import '../../node_modules/materialize-css/dist/css/materialize.min.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(CKEditor)

Vue.prototype.$ftp = ftp
Vue.prototype.$_ = _
Vue.prototype.$firebase = firebase
Vue.prototype.$pwHash = pwHash
Vue.prototype.$dateFns = dateFns
Vue.prototype.$q = Q
router.beforeEach((to, from, next) => {
  const loginStatus = store.state.Login.loginStatus
  if (loginStatus || from.path === '/') {
    next()
  } else {
    setTimeout(next({ path: '/Login' }), 501)
  }
})

/* eslint-disable no-new */
new Vue({
  mixins: [mixin],
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
