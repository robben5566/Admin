<template>
  <div>
    <md-dialog class="dialog" :md-active="isShow">
      <md-dialog-title>Change {{ content.type }}</md-dialog-title>

      <md-field>
        <label>名字</label>
        <md-input v-model="content.name"></md-input>
      </md-field>

      <md-field v-if="isShowDes">
        <label>描述</label>
        <md-input v-model="content.description"></md-input>
      </md-field>
      <p>{{ $root.error.msg }}</p>
      <md-dialog-actions>
        <md-button class="md-primary" @click="deleteDialog">刪除</md-button>
        <md-button class="md-primary" @click="closeDialog">離開</md-button>
        <md-button class="md-primary" @click="saveDialog">儲存</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: 'changeDialog',
  props: ['obj', 'isShow', 'isAdd', 'isShowDes'],
  inject: ['reload'],
  data: function() {
    return {
      content: {
        name: '',
        id: '',
        description: ''
      },
      errorMsg: ''
    }
  },
  methods: {
    async deleteDialog() {
      // 1. 確認這個是Nav or Color (從外部帶來的參數)，然後刪它
      var _siteList = this.$_.cloneDeep(this.$store.state.SiteList.siteList)
      var type
      var msg = ''
      if (this.content.type === 'nav') {
        type = 'navType'
        msg = '在 版型分類 刪除 ' + this.content.name
        await delete this.content.type
        await this.$store.dispatch('submitDeleteNav', this.content)
      } else if (this.content.type === 'color') {
        type = 'colorType'
        msg = '在色系分類 刪除 ' + this.content.name
        await delete this.content.type
        await this.$store.dispatch('submitDeleteColor', this.content)
      }

      // 2. 找出是該分類的站台，刪掉這個分類
      this.$_.forEach(_siteList, site => {
        var isChange = false
        for (var i = 0; i < site[type].length; i++) {
          if (site[type][i] === parseInt(this.content.id)) {
            site[type].splice(i, 1)
            isChange = true
            break
          }
        }
        // 2-1. 如果刪完就沒分類，給他0
        if (site[type].length === 0) {
          site[type].push(0)
        }
        if (isChange) {
          this.$store.dispatch('submitChangeSite', site) // todo: await
        }
      })
      await this.$root.delay100ms()
      await this.$root.updateTxt()
      await this.$root.delay100ms()
      await this.$root.submitOpRecord(msg)
      await this.reload()
      if (!this.$root.error.isError) {
        await this.$emit('update:isShow', !this.isShow)
      }
    },
    closeDialog() {
      this.$emit('update:isShow', !this.isShow)
    },
    async saveDialog() {
      console.log(this.content)
      var msg = ''

      if (this.content.type === 'nav') {
        await delete this.content.type

        var navs = this.$store.state.Nav.nav

        if (this.content.id === undefined) {
          this.content.id = (await navs[navs.length - 1].id) + 1
        } else {
          this.originName = navs.filter(n => n.id === this.content.id)[0].name
        }

        if (this.isAdd) {
          msg = '在 版型分類 加入 ' + this.content.name
          await this.$store.dispatch('submitAddNav', this.content)
        } else {
          msg = '把版型分類 ' + this.originName + ' 改為 ' + this.content.name
          await this.$store.dispatch('submitChangeNav', this.content)
        }
      } else if (this.content.type === 'color') {
        await delete this.content.type

        var colors = this.$store.state.Color.color
        if (this.content.id === undefined) {
          this.content.id = (await colors[colors.length - 1].id) + 1
        }

        if (this.isAdd) {
          msg = '在 色系分類 加入 ' + this.content.name
          await this.$store.dispatch('submitAddColor', this.content)
        } else {
          this.originName = colors.filter(c => c.id === this.content.id)[0].name
          msg = '把版型分類 ' + this.originName + ' 改為 ' + this.content.name
          await this.$store.dispatch('submitChangeColor', this.content)
        }
      }
      await this.$root.delay100ms()
      await this.$root.updateTxt()
      await this.$root.submitOpRecord(msg)
      await this.reload()
      if (!this.$root.error.isError) {
        await this.$emit('update:isShow', !this.isShow)
      }
    }
  },
  watch: {
    obj: function(newValue) {
      this.content = newValue
    }
  }
}
</script>

<style scoped>
.dialog {
  width: 70%;
  padding: 12px 24px;
}
</style>
