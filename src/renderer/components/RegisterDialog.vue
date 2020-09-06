<template>
  <div>
    <md-dialog class="dialog" :md-active="isShow">
      <md-dialog-title>註冊</md-dialog-title>

      <md-field>
        <label>邀請碼</label>
        <md-input v-model="content.code"></md-input>
      </md-field>

      <md-field>
        <label>帳號</label>
        <md-input v-model="content.account"></md-input>
      </md-field>

      <md-field>
        <label>密碼</label>
        <md-input v-model="content.password" type="password"></md-input>
      </md-field>

      <md-field>
        <label>名字</label>
        <md-input v-model="content.name"></md-input>
      </md-field>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog">取消</md-button>
        <md-button class="md-primary" @click="saveDialog">註冊</md-button>
      </md-dialog-actions>
      <p>{{ wrongMsg }}</p>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: 'registerDialog',
  props: ['isShow'],
  data: function () {
    return {
      content: {},
      wrongMsg: '',
    }
  },
  methods: {
    deleteDialog() {},
    closeDialog() {
      this.$emit('update:isShow', !this.isShow)
    },
    async saveDialog() {
      if (this.content.code === undefined || this.content.code.length < 1) {
        this.wrongMsg = '邀請碼不得為空'
        return
      }
      if (
        this.content.account === undefined ||
        this.content.account.length < 1
      ) {
        this.wrongMsg = '帳號不得為空'
        return
      }
      if (
        this.content.password === undefined ||
        this.content.password.length < 1
      ) {
        this.wrongMsg = '密碼不得為空'
        return
      }
      if (this.content.name === undefined || this.content.name.length < 1) {
        this.wrongMsg = '姓名不得為空'
        return
      }
      var msg = ''
      var registerTime = 30
      var nowTime = this.$dateFns.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
      var codeData = await this.$firebase.getCode(this.content.code)

      var diffTime = this.$dateFns.differenceInMinutes(
        nowTime,
        codeData.code.createTime
      )
      if (codeData !== 0) {
        if (codeData.isUse) {
          this.wrongMsg = '此邀請碼已使用過'
          return
        }

        if (diffTime < registerTime) {
          var _codeData = codeData

          // 以下產生帳號
          var data = {
            id: (await this.$firebase.getMaxUserId()) + 1,
            code: codeData.code.code,
            account: this.content.account,
            password: await this.$pwHash.encode(this.content.password),
            name: this.content.name,
            createTime: this.$dateFns.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            isLock: false,
          }
          this.wrongMsg = await this.$firebase.updateAccount(data)

          _codeData.code.isUse = true
          await this.$firebase.updateCode(_codeData.code)

          var loginAccount = {
            id: data.id,
            account: data.account,
            name: data.name,
          }
          msg = '註冊成功'
          await this.$store.dispatch('submitLogin', loginAccount)
          this.$emit('update:isShow', !this.isShow)

          this.$root.loadTxt()
          var vm = this
          setTimeout(async function () {
            vm.$router.push({ path: '/SiteList' })
            await vm.$root.submitOpRecord(msg)
          }, 1000)
        } else {
          this.wrongMsg = '註冊碼時效已過'
        }
      } else {
        this.wrongMsg = '沒這條碼'
      }
    },
  },
}
</script>

<style scoped>
.dialog {
  width: 70%;
  padding: 12px 24px;
}
</style>
