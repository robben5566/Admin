<template>
  <div>
    <md-tabs>
      <md-tab v-for="s in filterSiteType" :key="s.id" :md-label="s.name" :id="'tab-' + s.id" exact>
        <site-list-filter :prop_isFilter="true" :prop_filterObj="{ type: 'siteType', id: s.id }"></site-list-filter>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
import SiteListFilter from './SiteListFilter'

export default {
  components: { SiteListFilter },
  name: 'typeList',
  data() {
    return {}
  },
  created() {},
  computed: {
    siteType() {
      return this.$store.state.SiteType.siteType
    },
    filterSiteType() {
      return this.siteType.filter(s => s.id !== 0)
    }
  },
  methods: {}
}
</script>

<style></style>
