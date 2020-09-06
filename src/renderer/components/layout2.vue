<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">Admin</span>
        <select-theme id="select-theme"></select-theme>
      </md-app-toolbar>

      <md-app-drawer id="nav" md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0"></md-toolbar>

        <md-list>
          <router-link tag="md-list-item" :to="{ name: 'siteDetial', query: { siteId:'Create' }}">
            <span class="md-list-item-text">新增清單</span>
          </router-link>

          <router-link tag="md-list-item" to="/SiteList">
            <span class="md-list-item-text">站台清單</span>
          </router-link>

          <router-link tag="md-list-item" to="/TypeList">
            <span class="md-list-item-text">速成版型/設計專版</span>
          </router-link>

          <router-link tag="md-list-item" to="/ColorList">
            <span class="md-list-item-text">色系分類</span>
          </router-link>

          <router-link tag="md-list-item" to="/NavList">
            <span class="md-list-item-text">版型分類</span>
          </router-link>

          <router-link tag="md-list-item" to="/NewsDetial">
            <span class="md-list-item-text">公告</span>
          </router-link>

          <router-link tag="md-list-item" to="/CreateJoinCode">
            <span class="md-list-item-text">產生註冊碼</span>
          </router-link>

          <router-link tag="md-list-item" to="/OperationRecord">
            <span class="md-list-item-text">操作紀錄</span>
          </router-link>

          <!-- <md-list-item @click="$root.submitOpRecord('zzzzz')">
            <span class="md-list-item-text">產生操作紀錄 測試</span>
          </md-list-item>-->
          <md-list-item @click="$root.logout">
            <span class="md-list-item-text">登出</span>
          </md-list-item>
          <!-- <md-list-item>
            <span class="md-list-item-text">
              <router-link to="/Login">Login</router-link>
            </span>
          </md-list-item>-->

          <!--<md-list-item>
            <span class="md-list-item-text">
              <router-link to="/MemberList">memberList</router-link>
            </span>
          </md-list-item>-->
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view v-if="isRouterAlive" />
      </md-app-content>
    </md-app>
    <div class="overlay" v-show="$root.isUploading"></div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
}
#select-theme {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}
.md-app {
  height: 100%;
  border: 1px solid rgba(#000, 0.12);
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

.md-app-content {
  position: relative;
}

.md-list-item-text {
  display: block;
}

.router-link-active {
  background-color: rgba(255, 255, 255, 0.12);
  background-color: var(
    --md-theme-default-divider-on-background,
    rgba(255, 255, 255, 0.12)
  );
  color: #fff;
  color: var(--md-theme-default-text-primary-on-background, #fff);
}
</style>

<script>
import SelectTheme from './selectTheme'
export default {
  components: { SelectTheme },
  name: 'layout2',
  provide() {
    return {
      reload: this.reload
    }
  },
  data: function() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      console.log('reload')
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    }
  }
}
</script>
