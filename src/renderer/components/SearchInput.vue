<template>
  <div>
    <md-field>
      <label>搜尋站台編號</label>
      <md-input v-model="str"></md-input>
    </md-field>
  </div>
</template>

<script>
export default {
  name: 'searchInput',
  data() {
    return { str: this.searchStr }
  },
  watch: {
    str(newStr) {
      this.$store.dispatch('submitUpdateSearchStr', this.str)
      this.$emit('input', newStr)
    }
  }
}
</script>

<style>
</style>
