<template>
  <div>
    <form v-on:keyup.enter="loginClick()">
      <md-field>
        <label>帳號</label>
        <md-input v-model="acc.account"></md-input>
      </md-field>

      <md-field>
        <label>密碼</label>
        <md-input v-model="acc.password" type="password"></md-input>
      </md-field>
      <p>{{ errorMsg }}</p>
      <md-button v-if="isCurVer" class="md-primary" @click="registerClick()">註冊</md-button>
      <md-button v-if="isCurVer" class="md-primary" @click="loginClick()">登入</md-button>
      <!-- <md-button class="md-primary" @click="testClick()">測試用</md-button> -->
    </form>
    <register-dialog :isShow.sync="isShowDialog"></register-dialog>
  </div>
</template>

<script>
import RegisterDialog from './RegisterDialog'
export default {
  components: { RegisterDialog },
  name: 'login',
  data() {
    return {
      acc: {
        account: '',
        password: '',
      },
      errorMsg: '',
      isShowDialog: false,
      isCurVer: true,
      canLogin: false,
    }
  },
  async created() {
    await this.$root.delay100ms()
    this.$store.dispatch('submitLogout')
  },
  async mounted() {
    const dbVer = await this.$firebase.getVersion()
    const localVer = '1.2.4'
    if (dbVer !== localVer) {
      this.errorMsg = '版本不符，請聯絡負責人'
      this.isCurVer = false
    } else {
      this.isCurVer = true
      this.canLogin = true
      this.errorMsg = ''
    }
  },
  methods: {
    async loginClick() {
      if (!this.isCurVer) {
        this.errorMsg = '版本不符，請聯絡負責人'
        return
      }

      if (!this.canLogin) {
        this.errorMsg = '稍後，待訊息消失後再按一次'
        return
      }

      if (this.acc.account === '' || this.acc.password === '') {
        this.errorMsg = '請輸入帳密'
        return
      }
      var dbAcc = await this.$firebase.getAccount(this.acc)
      if (!dbAcc) {
        this.errorMsg = '沒這帳號'
        return
      }
      var isCurrentPw = await this.$pwHash.decode(
        dbAcc.password,
        this.acc.password
      )
      if (!isCurrentPw) {
        this.errorMsg = '密碼錯誤'
      } else {
        var loginAccount = {
          id: dbAcc.id,
          account: dbAcc.account,
          name: dbAcc.name,
        }
        var msg = '登入'
        this.errorMsg = '密碼對了'
        await this.$store.dispatch('submitLogin', loginAccount)
        await this.$root.loadTxt()
        var vm = this
        setTimeout(async function () {
          vm.$router.push({ path: '/SiteList' })
          await vm.$root.submitOpRecord(msg)
        }, 1000)
      }
    },
    fakeloginClick() {
      console.log('fakeLogin!!')
      var fakeLoginAccount = {
        id: '999',
        account: 'fakeAcc',
        name: 'fakeName',
      }
      this.$store.dispatch('submitLogin', fakeLoginAccount)
      this.$router.push({ path: '/SiteList' })
    },
    logoutClick() {
      console.log('logout!!')
      this.$store.dispatch('submitLogout')
    },
    registerClick() {
      this.isShowDialog = true
    },
    testClick() {
      this.$root.loadTxt()
    },
  },
}
</script>
<style></style>
