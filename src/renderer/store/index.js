import Vue from 'vue'
import Vuex from 'vuex'
import { createPersistedState, createSharedMutations } from 'vuex-electron'
import modules from './modules'
// import VueLodash from 'vue-lodash'

// const options = { name: 'lodash' } // customize the way you want to call it
// Vue.use(VueLodash, options) // options is optional

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [createPersistedState(), createSharedMutations()],
  strict: process.env.NODE_ENV !== 'production'
})
