<template>
  <div>
    <search-input @input="
        newStr => {
          searchStr = newStr
        }
      "></search-input>
    <table class="table" :class="{ 'table-dark': $root.themeColor === 'black' }">
      <thead>
        <tr>
          <th scope="col">序號</th>
          <th scope="col">站代號</th>
          <th scope="col">站名</th>
          <th scope="col">網址</th>
          <th scope="col">前台可見</th>
          <th scope="col">詳細</th>
        </tr>
      </thead>
      <!-- 分兩塊 搜尋的時候可拖拉 -->
      <draggable v-show="searchStr === ''" tag="tbody" :list="siteList" @change="checkMove">
        <tr
          scope="row"
          v-for="(site,index) in siteList"
          :key="site.id"
          :class="{ 'table-dark': site.isDraged }"
        >
          <td>{{ index+1 }}</td>
          <td>{{ site.webSiteName }}</td>
          <td>{{ site.cnName }}</td>
          <td>{{ site.domain }}</td>
          <td>{{ site.isShow == true ? '' : 'X' }}</td>
          <td @click="toDetial(site)">編輯</td>
        </tr>
      </draggable>
      <!-- 分兩塊 搜尋的時候可拖拉 -->
      <tbody v-show="searchStr !== ''">
        <tr
          scope="row"
          v-for="(site,index) in filterSiteList"
          :key="site.id"
          :class="{ 'table-dark': site.isDraged }"
        >
          <td>{{ index+1 }}</td>
          <td>{{ site.webSiteName }}</td>
          <td>{{ site.cnName }}</td>
          <td>{{ site.domain }}</td>
          <td>{{ site.isShow == true ? '' : 'X' }}</td>
          <td @click="toDetial(site)">編輯</td>
        </tr>
      </tbody>
    </table>
    <!-- v-if="isListDraged" -->
    <div class="buttons" v-if="isListDraged">
      <md-button class="md-primary" @click="recoverSort()">復原</md-button>
      <md-button class="md-primary" @click="changeSort()">確定</md-button>
      <!-- <md-button class="md-primary" @click="testClick()">test help me</md-button> -->
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import SearchInput from './SearchInput'
export default {
  components: { SearchInput, draggable },
  name: 'siteList',
  props: {
    prop_isFilter: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    prop_filterObj: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      isFilter: this.prop_isFilter,
      filterObj: this.prop_filterObj,
      siteList: [],
      siteOriginList: [],
      nav: [],
      color: [],
      searchStr: '',
      isListDraged: false,
      changeList: [],
      isSearchMode: false
    }
  },
  mounted() {
    var vuexSiteList = this.$store.state.SiteList.siteList
    this.siteOriginList = this.$_.cloneDeep(vuexSiteList)
    this.siteList = this.$_.cloneDeep(this.$store.state.SiteList.siteList)
  },
  computed: {
    filterSiteList: function() {
      return this.siteOriginList.filter(
        s => s.webSiteName.indexOf(this.searchStr.toUpperCase()) !== -1
      )
    }
  },
  methods: {
    checkMove: function(evt) {
      this.isListDraged = true
      this.siteList[evt.moved.newIndex].isDraged = true
      // 只標記變動的
      // this.siteList[evt.moved.oldIndex].isDraged = true
      this.$forceUpdate()
    },
    changeSort: async function() {
      await this.$root.submitAddOverLay()
      this.siteList.forEach(site => {
        delete site.isDraged
      })

      await this.$store.dispatch('submitAddAllSiteSync', this.siteList)
      await this.$root.delay500ms()
      await this.$root.updateTxt()
      await this.$root.submitOpRecord('換順序')

      // this.$store.dispatch('submitAddAllSite', this.siteList)
      this.$forceUpdate()
    },
    recoverSort: function() {
      console.log('recover sort')
      this.isListDraged = false
      this.siteList = this.$_.cloneDeep(this.$store.state.SiteList.siteList)
    },
    testClick: function() {
      this.$root.loadTxt()
      this.$forceUpdate()
    },
    toDetial: function(site) {
      this.$router.push({
        name: 'siteDetial',
        query: { site: site, siteId: site.webSiteName }
      })
    }
  }
}
</script>

<style scoped>
table {
  font-size: 0.95rem;
  background: transparent;
}
thead th {
  border-top: none;
}
</style>
