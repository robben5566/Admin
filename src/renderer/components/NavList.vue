<template>
  <div>
    <md-tabs class="selectLi">
      <md-tab
        @dblclick="dbclick(n)"
        v-for="n in nav"
        :key="n.id"
        :md-label="n.name"
        :id="'tab-' + n.id"
        exact
      >
        <site-list-filter :prop_isFilter="true" :prop_filterObj="{ type: 'navType', id: n.id }"></site-list-filter>
      </md-tab>
      <md-tab @dblclick="dbclick()" :key="'add'" :md-label="'+'" :id="'tab-add'" exact></md-tab>
    </md-tabs>

    <change-dialog :isShow.sync="isShowDialog" :obj="toDialog" :isAdd="isAdd" :isShowDes="true"></change-dialog>
  </div>
</template>

<script>
import SiteListFilter from './SiteListFilter'
import ChangeDialog from './ChangeDialog'
export default {
  components: { SiteListFilter, ChangeDialog },
  name: 'navList',
  data() {
    return {
      isShowDialog: false,
      toDialog: {},
      isAdd: false
    }
  },
  created() {
    console.log('Create NavList')
  },
  computed: {
    nav() {
      return this.$store.state.Nav.nav
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

      this.toDialog = this.$_.cloneDeep(obj)
      this.toDialog.type = 'nav'

      this.isShowDialog = true
    }
  }
}
</script>

<style>
.selectLi .md-button.md-active:before {
  background-color: currentColor;
  opacity: 0.12;
}
</style>
