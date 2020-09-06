<template>
  <div>
    <p>memberlist</p>
    <md-button class="md-fab md-plain" @click="registerClick()">
      <md-icon>註冊</md-icon>
    </md-button>
    <!-- <md-button class="md-fab md-plain" @click="createCodeClick()">
      <md-icon>產碼</md-icon>
    </md-button>-->
    <register-dialog :isShow.sync="isShowDialog"></register-dialog>
  </div>
</template>

<script>
import dateFns from 'date-fns'
import randomstring from 'randomstring'
import RegisterDialog from './RegisterDialog'
function insertDefaultData(vm) {
  var dataCount = 5
  for (var i = 0; i < dataCount; i++) {
    var data = {
      code: '',
      id: i,
      account: '',
      password: 123456,
      name: '',
      createTime: '',
      isLock: false,
    }
    data.code = randomstring.generate(20)
    data.account = 'account-' + i
    data.name = 'name-' + i
    data.createTime = dateFns.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
  }
}
export default {
  components: { RegisterDialog },
  name: 'memberList',
  data() {
    return {
      isShowDialog: false,
    }
  },
  created() {
    this.$store.dispatch('submitAddAllCode', [])
    insertDefaultData(this)
  },
  methods: {
    registerClick: function (obj) {
      this.isShowDialog = true
      // 以下產生假帳號
      // var data = {
      //   code: randomstring.generate(19),
      //   id: 0,
      //   account: 'e04',
      //   password: 123456,
      //   name: 'fuck',
      //   createTime: dateFns.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
      //   isLock: false
      // }
      // this.$firebase.updateAccount(data)
    },
    createCodeClick: function () {
      // var data = {
      //   code: randomstring.generate(19),
      //   id: 0,
      //   account: '',
      //   password: 123456,
      //   name: '',
      //   createTime: dateFns.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
      //   isLock: false
      // }
      var data = {
        code: randomstring.generate(19),
        createTime: dateFns.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
        isUse: false,
      }
      this.$firebase.createCode(data)
    },
  },
}
</script>

<style>
</style>
