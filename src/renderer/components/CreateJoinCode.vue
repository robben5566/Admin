<template>
  <div>
    <p>產生註冊碼 (30分鐘內有效，限使用1次)</p>

    <md-button class="md-fab md-plain" @click="createCodeClick()">
      <md-icon>產碼</md-icon>
    </md-button>
    <p>{{ joincode }}</p>
  </div>
</template>

<script>
import dateFns from 'date-fns'
import randomstring from 'randomstring'
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
      isLock: false
    }
    data.code = randomstring.generate(20)
    data.account = 'account-' + i
    data.name = 'name-' + i
    data.createTime = dateFns.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
  }
}
export default {
  name: 'createJoinCode',
  data() {
    return {
      joincode: ''
    }
  },
  created() {
    insertDefaultData(this)
  },
  mounted() {},
  methods: {
    createCodeClick: function() {
      var data = {
        code: randomstring.generate(19),
        createTime: dateFns.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
        isUse: false
      }
      this.$firebase.createCode(data)
      this.joincode = data.code
    }
  }
}
</script>

<style>
</style>
