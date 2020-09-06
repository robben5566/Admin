import _ from 'lodash'

const state = {
  nav: []
}

const getters = {
  getNav: state => {
    return state.nav
  }
}

const mutations = {
  addAllNav(state, payload) {
    state.nav = payload
  },
  addNav(state, payload) {
    state.nav.push(payload)
  },
  changeNav(state, payload) {
    var changeThisNav = _.findIndex(state.nav, function(o) {
      return o.id === payload.id
    })
    state.nav.splice(changeThisNav, 1, payload)
  },
  deleteNav(state, payload) {
    var deleteNav = _.findIndex(state.nav, function(o) {
      return o.id === payload.id
    })
    state.nav.splice(deleteNav, 1)
  }
}

const actions = {
  submitAddAllNav(context, args) {
    context.commit('addAllNav', args)
  },
  submitAddNav(context, args) {
    context.commit('addNav', args)
  },
  submitChangeNav(context, args) {
    context.commit('changeNav', args)
  },
  submitDeleteNav(context, args) {
    context.commit('deleteNav', args)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
