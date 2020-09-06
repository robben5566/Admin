import _ from 'lodash'

const state = {
  siteList: [],
  searchStr: ''
}

const getters = {
  getSiteList: state => {
    return state.siteList
  }
}

const mutations = {
  addAllSite(state, payload) {
    state.siteList = payload
  },
  addAllSiteSync(state, payload) {
    state.siteList = payload
    console.log('submitAddAllSiteSync')
  },
  addSite(state, payload) {
    state.siteList.push(payload)
  },
  changeSite(state, payload) {
    var changeThisSite = _.findIndex(state.siteList, function(o) {
      return o.id === payload.id
    })
    state.siteList.splice(changeThisSite, 1, payload)
  },
  deleteSite(state, payload) {
    var deleteSite = _.findIndex(state.siteList, function(o) {
      return o.id === payload.id
    })
    state.siteList.splice(deleteSite, 1)
  },
  deleteAllSite(state) {
    state.siteList = []
  },
  updateSearchStr(state, payload) {
    state.searchStr = payload
  }
}

const actions = {
  submitAddAllSite(context, args) {
    context.commit('addAllSite', args)
  },
  submitAddSite(context, args) {
    context.commit('addSite', args)
  },
  async submitAddAllSiteSync(context, args) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        context.commit('addAllSiteSync', args)
        resolve()
      }, 10)
    })
  },
  submitChangeSite(context, args) {
    context.commit('changeSite', args)
  },
  submitDeleteSite(context, args) {
    context.commit('deleteSite', args)
  },
  submitDeleteAllSite(context, args) {
    context.commit('deleteAllSite', args)
  },
  submitUpdateSearchStr(context, args) {
    context.commit('updateSearchStr', args)
  }
}

export default {
  getters,
  state,
  mutations,
  actions
}
