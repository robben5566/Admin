<template>
  <div>
    <div>
      <span class="block">開嗎</span>
      <md-radio v-model="newsContent.isOpen" :value="true">Yes</md-radio>
      <md-radio v-model="newsContent.isOpen" :value="false">No</md-radio>
    </div>

    <md-field>
      <label>圖片路徑</label>
      <md-input v-model="newsContent.imgPath" @click="selectImgPath()"></md-input>
    </md-field>

    <ckeditor
      class="editor"
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
      @ready="prefill"
    ></ckeditor>

    <md-button class="md-primary" @click="closeDetial()">離開</md-button>
    <md-button class="md-primary" @click="submitDetial()">儲存</md-button>
  </div>
</template>

<script>
import { remote } from 'electron'
import dateFns from 'date-fns'
import path from 'path'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
function parseImage(imgs, id) {
  var folder = '/v2/images/' + id + '/'
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

export default {
  name: 'newsDetial',
  data: function () {
    return {
      newsContent: {
        isOpen: false,
        message: 'default',
        imgPath: 'https://via.placeholder.com/10',
      },
      isImgChange: false,
      ftpImgPath: [],
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
        // The configuration of the editor.
        removePlugins: ['Link', 'ImageUpload', 'MediaEmbed'],
      },
    }
  },
  mounted() {
    var deepCloneNews = this.$_.cloneDeep(this.$store.getters.getNews)
    this.newsContent = deepCloneNews
  },
  methods: {
    prefill(editor) {
      this.editorData = this.newsContent.message
    },
    async submitDetial() {
      this.newsContent.message = this.editorData
      if (this.isImgChange) {
        var deepCloneImgPath = this.$_.cloneDeep(this.newsContent.imgPath)
        this.ftpImgPath = parseImage(deepCloneImgPath, 'float')
        this.newsContent.imgPath = this.ftpImgPath
      }

      await this.$store.dispatch('submitChangeNews', this.newsContent)
      await this.$root.submitAddOverLay()
      // 上傳圖片
      if (this.isImgChange) {
        await this.$ftp.updateImages(deepCloneImgPath, this.ftpImgPath, 'float')
      }
      var msg = '更改公告'
      // 上傳json
      await this.$root.updateTxt()
      await this.$root.submitOpRecord(msg)
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
          filters: [{ name: 'Image', extensions: ['jpg', 'png'] }],
        },
        (files) => {
          if (files === undefined) {
            // 如果按取消 = undefined
            this.isImgChange = false
          } else if (files.length > 10) {
            // 不想給你傳那麼多圖
            this.isImgChange = false
          } else {
            this.isImgChange = true
            this.newsContent.imgPath = files
          }
        }
      )
    },
  },
  beforeRouteUpdate(to, from, next) {
    // 刷新產生站台用
    next()
    this.reload()
  },
}
</script>

<style>
.block {
  display: block;
}
.ck-editor__editable_inline {
  /* min-height: 30%; */
  height: 400px;
}
.ck-editor__main {
  color: var(--main-txt-color);
}
</style>
