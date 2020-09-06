const state = {
  news: {}
}
const getters = {
  getNews: state => {
    return state.news
  }
}

const mutations = {
  changeNews(state, payload) {
    state.news = payload
  }
}

const actions = {
  submitChangeNews(context, args) {
    context.commit('changeNews', args)
  }
}

export default {
  getters,
  state,
  mutations,
  actions
}
