<template>
  <div>
    <md-table>
      <md-table-row>
        <md-table-head>時間</md-table-head>
        <md-table-head>帳號</md-table-head>
        <md-table-head>做什麼</md-table-head>
      </md-table-row>

      <md-table-row v-for="record in recordList" :key="record.id">
        <md-table-cell>{{ record.time }}</md-table-cell>
        <md-table-cell :title="record.user.account">{{ record.user.name }}</md-table-cell>
        <md-table-cell>{{ record.detial }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: 'operationRecord',
  data() {
    return {
      recordList: []
    }
  },
  async mounted() {
    this.recordList = await this.$firebase.getOpRecord()
  }
}
</script>

<style scoped></style>
