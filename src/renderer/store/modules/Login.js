const state = {
  loginStatus: false,
  loginAccount: null
}

const mutations = {
  login(state, payload) {
    state.loginStatus = true
    state.loginAccount = payload
  },
  logout(state) {
    state.loginStatus = false
    state.loginAccount = null
  }
}

const actions = {
  submitLogin(context, args) {
    context.commit('login', args)
  },
  submitLogout(context) {
    context.commit('logout')
  }
}

export default {
  state,
  mutations,
  actions
}
