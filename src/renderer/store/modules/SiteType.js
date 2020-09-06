import _ from 'lodash'

const state = {
  siteType: []
}

const getters = {
  getSiteType: state => {
    return state.siteType
  }
}

const mutations = {
  addAllSiteType(state, payload) {
    state.siteType = payload
  },
  addSiteType(state, payload) {
    state.siteType.push(payload)
  },
  changeSiteType(state, payload) {
    var changeThisSiteType = _.findIndex(state.siteType, function(o) {
      return o.id === payload.id
    })
    state.siteType.splice(changeThisSiteType, 1, payload)
  },
  deleteSiteType(state, payload) {
    var deleteSiteType = _.findIndex(state.siteType, function(o) {
      return o.id === payload.id
    })
    state.siteType.splice(deleteSiteType, 1)
  }
}

const actions = {
  submitAddAllSiteType(context, args) {
    context.commit('addAllSiteType', args)
  },
  submitAddSiteType(context, args) {
    context.commit('addSiteType', args)
  },
  submitChangeSiteType(context, args) {
    context.commit('changeSiteType', args)
  },
  submitDeleteSiteType(context, args) {
    context.commit('deleteSiteType', args)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
