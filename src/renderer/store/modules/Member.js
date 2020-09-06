import _ from 'lodash'

const state = {
  maxId: 0,
  code: [
    {
      code: 'xxxxxxxxx',
      id: '0',
      account: 'account',
      password: '123456',
      name: 'name',
      createTime: '',
      isLock: false
    }
  ]
}

const mutations = {
  addAllCode(state, payload) {
    state.code = payload
  },
  addCode(state, payload) {
    // if (payload.id > state.maxId) {
    //   state.maxId = payload.id
    // }

    state.code.push(payload)
  },
  changeCodeById(state, payload) {
    var changeThisCode = _.findIndex(state.code, function(o) {
      return o.id === payload.id
    })
    state.code.splice(changeThisCode, 1, payload)
  },
  changeCodeByCode(state, payload) {
    var changeThisCode = _.findIndex(state.code, function(o) {
      return o.code === payload.code
    })
    state.code.splice(changeThisCode, 1, payload)
  },
  deleteCode(state, payload) {
    var deleteCode = _.findIndex(state.code, function(o) {
      return o.id === payload.id
    })
    state.code.splice(deleteCode, 1)
  }
}

const actions = {
  submitAddAllCode(context, args) {
    context.commit('addAllCode', args)
  },
  submitAddCode(context, args) {
    context.commit('addCode', args)
  },
  submitChangeCodeById(context, args) {
    context.commit('changeCodeById', args)
  },
  submitChangeCodeByCode(context, args) {
    context.commit('changeCodeByCode', args)
  },
  submitDeleteCode(context, args) {
    context.commit('deleteCode', args)
  }
}

export default {
  state,
  mutations,
  actions
}
