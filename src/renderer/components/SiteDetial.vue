<template>
  <div>
    <md-field :class="{ 'md-invalid': isInVaild }">
      <label>編號(限AB003-00這種格式+不可重複)</label>
      <md-input v-model="siteDetial.webSiteName"></md-input>
      <span class="md-error" v-if="isInVaild.isHaveWebsite">已有此編號</span>
      <span class="md-error" v-if="isInVaild.isErrName">限AB003-00這種格式</span>
      <span class="md-error" v-if="isInVaild.isNull">必填</span>
    </md-field>

    <md-field>
      <label>站名</label>
      <md-input v-model="siteDetial.cnName"></md-input>
    </md-field>

    <md-field>
      <label>網址</label>
      <md-input v-model="siteDetial.domain"></md-input>
    </md-field>

    <md-field>
      <label>圖片路徑</label>
      <!-- <md-file v-model="siteDetial.imgPath" accept="image/*" name="fff" @md-change="imgChange()" multiple></md-file> -->
      <md-input v-model="siteDetial.imgPath" @click="selectImgPath()"></md-input>
    </md-field>

    <div>
      <span class="block">分類</span>
      <md-checkbox
        v-for="n in notNullNav"
        :key="n.id"
        v-model="siteDetial.navType"
        :value="n.id"
      >{{ n.name }}</md-checkbox>
    </div>
    <div>
      <span class="block">顏色</span>
      <md-checkbox
        v-for="c in notNullColor"
        :key="c.id"
        v-model="siteDetial.colorType"
        :value="c.id"
      >{{ c.name }}</md-checkbox>
    </div>

    <div>
      <span class="block">哪種版(沒勾的話會預設為速成)</span>
      <md-checkbox
        v-for="s in notNullSiteType"
        :key="s.id"
        v-model="siteDetial.siteType"
        :value="s.id"
      >{{ s.name }}</md-checkbox>
    </div>

    <div>
      <md-datepicker v-model="siteDetial.updateDate">
        <label>更新日期</label>
      </md-datepicker>
    </div>

    <div>
      <span class="block">新嗎</span>
      <md-radio v-model="siteDetial.isNew" :value="true">Yes</md-radio>
      <md-radio v-model="siteDetial.isNew" :value="false">No</md-radio>
    </div>

    <div>
      <span class="block">前台可見嗎</span>
      <md-radio v-model="siteDetial.isShow" :value="true">Yes</md-radio>
      <md-radio v-model="siteDetial.isShow" :value="false">No</md-radio>
    </div>

    <md-field>
      <label>描述</label>
      <md-textarea v-model="siteDetial.description"></md-textarea>
    </md-field>

    <md-button v-if="!isCreate" class="md-primary" @click="deleteDetial()">刪除</md-button>
    <md-button class="md-primary" @click="closeDetial()">離開</md-button>
    <md-button v-if="isCreate" class="md-primary" @click="submitDetial()">產生</md-button>
    <md-button v-if="!isCreate" class="md-primary" @click="submitDetial()">儲存</md-button>
  </div>
</template>

<script>
import { remote } from 'electron'
import dateFns from 'date-fns'
import path from 'path'

function parseImage(imgs, id, webSiteName) {
  var folder = '/v2/images/' + id + '_' + webSiteName + '/'
  var ftpImgs = []
  imgs.forEach((img, index) => {
    var extname = path.extname(img)
    ftpImgs.push(
      folder +
        index +
        '-' +
        dateFns.format(new Date(), 'YYMMDD-HHmmss') +
        extname
    )
  })
  return ftpImgs
}

function formatDate(date) {
  return dateFns.format(date, 'YYYY-MM-DD')
}

export default {
  name: 'siteDetial',
  props: ['detial'],
  inject: ['reload'],
  data: function () {
    return {
      siteDetial: {
        id: this.maxSiteId() + 1,
        description: '',
        colorType: [0],
        navType: [0],
        siteType: [1],
        updateDate: dateFns.format(new Date(), 'YYYY-MM-DD'),
        isNew: false,
        isShow: true,
        imgPath: [],
      },
      isCreate: false,
      isImgChange: false,
      isHaveWebsite: false,
      isInVaild: false,
      ftpImgPath: [],
      msg: '',
    }
  },
  created() {
    console.log('Create SiteDetial')
    if (this.$route.query.siteId === 'Create') {
      this.isCreate = true
      this.msg = '加入站台 '
    } else {
      this.siteDetial = this.$route.query.site
      this.msg = '修改站台 '
    }
  },
  computed: {
    nav: function () {
      return this.$store.state.Nav.nav
    },
    color: function () {
      return this.$store.state.Color.color
    },
    siteType: function () {
      return this.$store.state.SiteType.siteType
    },
    // 濾掉 "沒分類" 這個id=0的分類
    notNullNav: function () {
      return this.nav.filter((n) => n.id !== 0)
    },
    notNullColor: function () {
      return this.color.filter((n) => n.id !== 0)
    },
    notNullSiteType: function () {
      return this.siteType.filter((n) => n.id !== 0)
    },
  },
  methods: {
    async submitDetial() {
      this.siteDetial.webSiteName = this.siteDetial.webSiteName.toUpperCase()
      this.isInVaild = await this.checkForm()
      if (!this.isCreate) {
        this.isInVaild.isHaveWebsite = false
      }
      if (this.$_.includes(this.isInVaild, true)) {
        return
      }

      // format time
      this.siteDetial.updateDate = formatDate(this.siteDetial.updateDate)
      // 如果有按圖片路徑那顆則 isImgChange = true
      // 會把圖片在本機的路徑轉成ftp的路徑
      if (this.isImgChange) {
        // 我需要把siteDetial.imgPath另外深拷貝存起來
        // 拿另外存的這串去處理檔案上傳的事
        // 避免汙染原始資料
        var deepCloneImgPath = this.$_.cloneDeep(this.siteDetial.imgPath)
        this.ftpImgPath = parseImage(
          deepCloneImgPath,
          this.siteDetial.id,
          this.siteDetial.webSiteName
        )
        console.log('isImgChange = true')
        this.siteDetial.imgPath = this.ftpImgPath
      }
      // 處理nav color Type 看有沒有被選，被選則拿掉Id 0
      // 如果是空的也給他Id 0
      this.filterId0('navType')
      this.filterId0('colorType')
      // siteType 沒選會是 Id 1
      this.filterIdto('siteType', 1)

      // 保存資料
      if (!this.isCreate) {
        await this.$store.dispatch('submitChangeSite', this.siteDetial)
      } else {
        await this.$store.dispatch('submitAddSite', this.siteDetial)
      }
      await this.$root.submitAddOverLay()
      // 上傳圖片
      if (this.isImgChange) {
        await this.$ftp.updateImages(
          deepCloneImgPath,
          this.ftpImgPath,
          this.siteDetial.id,
          this.siteDetial.webSiteName
        )
      }
      this.msg += this.siteDetial.webSiteName
      // 上傳json
      await this.$root.updateTxt()
      await this.$root.submitOpRecord(this.msg)
      await this.$router.back()
      await this.$router.push('siteList')
    },
    async deleteDetial() {
      await this.$root.submitAddOverLay()
      this.msg = '刪除站台 ' + this.siteDetial.webSiteName
      await this.$store.dispatch('submitDeleteSite', this.siteDetial)
      await this.$root.updateTxt()

      await this.$root.submitOpRecord(this.msg)
      await this.$router.back()
      await this.$router.push('siteList')
    },
    closeDetial() {
      this.$router.push('siteList')
    },
    imgChange() {
      this.isImgChange = true
    },
    selectImgPath() {
      remote.dialog.showOpenDialog(
        {
          properties: ['openFile', 'multiSelections'],
          filters: [{ name: 'Images', extensions: ['jpg', 'png'] }],
        },
        (files) => {
          if (files === undefined) {
            // 如果按取消 = undefined
            console.log('dialog cancel')
            this.isImgChange = false
          } else if (files.length > 10) {
            // 不想給你傳那麼多圖
            console.log('too many imgs')
            this.isImgChange = false
          } else {
            this.isImgChange = true
            this.siteDetial.imgPath = files
          }
        }
      )
    },
    filterId0(what) {
      var isOnlyId0 = true
      for (var i = 0; i < this.siteDetial[what].length; i++) {
        if (this.siteDetial[what][i] !== 0) {
          isOnlyId0 = false
          break
        }
      }
      if (!isOnlyId0) {
        if (this.siteDetial[what][0] === 0) {
          this.siteDetial[what].shift()
        }
      }
      if (this.siteDetial[what].length === 0) {
        this.siteDetial[what] = [0]
      }
    },
    filterIdto(what, toWhat) {
      if (this.siteDetial[what].length === 0) {
        this.siteDetial[what] = [toWhat]
      }
    },
    maxSiteId: function () {
      var siteList = this.$store.state.SiteList.siteList
      var bigId = 0
      siteList.forEach((site) => {
        bigId = site.id > bigId ? site.id : bigId
      })
      return bigId
    },
    async checkForm() {
      let regex = /[A-Z]{2}[0-9]{3}-[0-9]{2}/g
      return new Promise((resolve) => {
        var n = this.siteDetial.webSiteName
        if (n === undefined || n.length < 1) {
          resolve({ isHaveWebsite: false, isErrName: false, isNull: true })
        }
        if (n.match(regex) === null || n.match(regex).length !== 1) {
          resolve({ isHaveWebsite: false, isErrName: true, isNull: false })
        }

        var vuexSiteList = this.$store.state.SiteList.siteList
        var isHaveWebsite = false

        for (var i = 0; i < vuexSiteList.length; i++) {
          if (vuexSiteList[i].webSiteName === n) {
            isHaveWebsite = true
            break
          }
        }
        resolve({
          isHaveWebsite: isHaveWebsite,
          isErrName: false,
          isNull: false,
        })
      })
    },
  },
  beforeRouteUpdate(to, from, next) {
    // 刷新產生站台用
    next()
    this.reload()
  },
}
</script>

<style scoped>
.block {
  display: block;
}
</style>
