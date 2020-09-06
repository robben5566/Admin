<template>
  <div>
    <md-tabs>
      <md-tab
        @dblclick="pdSay = true"
        v-for="c in color"
        :key="c.id"
        :md-label="c.name"
        :id="'tab-' + c.id"
        exact
      >
        <site-list-filter :prop_isFilter="true" :prop_filterObj="{ type: 'colorType', id: c.id }"></site-list-filter>
      </md-tab>

      <!-- <md-tab @dblclick="dbclick()" :key="'add'" :md-label="'+'" :id="'tab-add'" exact></md-tab> -->
    </md-tabs>

    <change-dialog :isShow.sync="isShowDialog" :obj="toDialog" :isAdd="isAdd"></change-dialog>
    <md-dialog-alert :md-active.sync="pdSay" md-title="ERROR!" md-content="PD說不給你新增/修改分類" />
  </div>
</template>

<script>
import SiteListFilter from './SiteListFilter'
import ChangeDialog from './ChangeDialog'
export default {
  components: { SiteListFilter, ChangeDialog },
  name: 'colorList',
  data() {
    return {
      isShowDialog: false,
      toDialog: {},
      isAdd: false,
      pdSay: false
    }
  },
  computed: {
    color() {
      return this.$store.state.Color.color
    }
  },
  methods: {
    dbclick: function(obj) {
      if (obj === undefined) {
        obj = {}
        this.isAdd = true
      } else {
        this.isAdd = false
      }

      if (obj.id === 0) {
        return
      }
      // 給這東西多type屬性 讓dialog辨識是什麼鬼東西
      // todo: ColorList.vue and NavList.vue 看能不能弄成同一支檔案
      this.toDialog = this.$_.cloneDeep(obj)
      this.toDialog.type = 'color'

      this.isShowDialog = true
    }
  }
}
</script>

<style></style>
