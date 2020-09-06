import originData from './origin.js'
export default {
  data: function () {
    return {
      error: { isError: false, msg: '' },
      isUploading: false,
      themeColor: 'black'
    }
  },
  computed: {
    getAllNav() {
      return this.$store.getters.getNav
    },
    getAllColor() {
      return this.$store.getters.getColor
    },
    getAllSiteType() {
      return this.$store.getters.getSiteType
    },
    getAllSiteList() {
      return this.$store.getters.getSiteList
    },
    getAllNews() {
      return this.$store.getters.getNews
    }
  },
  methods: {
    loadTxt: async function () {
      this.originData = originData
      //var data = await this.$ftp.getData('/result.txt')
      var data = await this.$fake.getData()
      console.log('from mixin')
      var res = JSON.parse(data.toString())

      this.siteList = res.siteList
      await this.$store.dispatch('submitAddAllSite', res.siteList)

      this.nav = res.nav
      await this.$store.dispatch('submitAddAllNav', res.nav)

      this.color = res.color
      await this.$store.dispatch('submitAddAllColor', res.color)

      this.news = res.news
      await this.$store.dispatch('submitChangeNews', res.news)

      this.siteType = res.siteType
      await this.$store.dispatch('submitAddAllSiteType', res.siteType)

      console.log('from mixin-end')
      return Promise.resolve()
    },
    updateTxt: async function () {
      let siteList = this.getAllSiteList
      let nav = this.getAllNav
      let color = this.getAllColor
      let news = this.getAllNews
      let siteType = this.getAllSiteType

      let content = {}
      content.lastUpdateTime = this.getNowTime()
      content.siteList = siteList
      content.nav = nav
      content.color = color
      content.news = news
      content.siteType = siteType

      await this.$firebase.addOldData(content)
      await this.delay100ms()
      var jsonContent = JSON.stringify(content)
      var result = await this.$ftp.updateJSONToFTPV2(jsonContent)

      if (!result) {
        this.error.isError = true
        this.error.msg = '請重試'
      }
      this.error.msg = ''
      console.log('updateTxt done')
      await this.delay100ms()

    },
    delay100ms: async function () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 100)
      })
    },
    delay500ms: async function () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 500)
      })
    },
    submitOpRecord: async function (operation) {
      var defered = this.$q.defer()
      var user = this.$store.state.Login.loginAccount
      var nowTime = this.$dateFns.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
      var router = {
        fullpath: this.$router.currentRoute.fullpath
          ? this.$router.currentRoute.fullpath
          : null,
        name: this.$router.currentRoute.name
          ? this.$router.currentRoute.name
          : null,
        params: this.$router.currentRoute.params
          ? this.$router.currentRoute.params
          : null
      }
      var sendObj = {
        id: (await this.$firebase.getMaxOpId()) + 1,
        time: nowTime,
        user: user,
        detial: operation,
        router: router
      }
      this.$firebase.addOpRecord(sendObj).then(() => {
        this.isUploading = false
        defered.resolve()
      })
      return defered.promise
    },
    submitAddOverLay: async function () {
      this.isUploading = true
    },
    submitAddOverLayDone: async function () {
      this.isUploading = false
    },
    logout() {
      console.log('logout!!')
      this.$store.dispatch('submitLogout')
      this.$router.push({ path: '/Login' })
    },
    getNowTime: function () {
      return this.$dateFns.format(new Date(), 'YYYY-MM-DDTHH:mm:ss')
    }
  }
}
