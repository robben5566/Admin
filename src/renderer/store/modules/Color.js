import _ from 'lodash'

const state = {
  color: []
}

const getters = {
  getColor: state => {
    return state.color
  }
}

const mutations = {
  addAllColor(state, payload) {
    state.color = payload
  },
  addColor(state, payload) {
    state.color.push(payload)
  },
  changeColor(state, payload) {
    var changeThisColor = _.findIndex(state.color, function(o) {
      return o.id === payload.id
    })
    state.color.splice(changeThisColor, 1, payload)
  },
  deleteColor(state, payload) {
    var deleteColor = _.findIndex(state.color, function(o) {
      return o.id === payload.id
    })
    state.color.splice(deleteColor, 1)
  }
}

const actions = {
  submitAddAllColor(context, args) {
    context.commit('addAllColor', args)
  },
  submitAddColor(context, args) {
    context.commit('addColor', args)
  },
  submitChangeColor(context, args) {
    context.commit('changeColor', args)
  },
  submitDeleteColor(context, args) {
    context.commit('deleteColor', args)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
