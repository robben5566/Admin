### 簡介

透過此後台產生一個 json 格式的 txt 到 ftp 給前台讀

可以上傳圖片、有登入登出功能、操作紀錄

### 用到的東西

electron、node.js、vue、firebase

#### 產生的東西

```bash
{
    lastUpdateTime: "2019-05-10T17:12:06",
    siteList: [
      {
        cnName: "AB003-01",
        colorType: [0],
        description: "",
        domain: "",
        id: 0,
        imgPath: ["/v2/id_0/0-191126-155802.jpg"],
        isNew: false,
        isShow: false,
        navType: [0],
        siteType: [2],
        updateDate: "2017-01-01",
        webSiteName: "AB003-01"
      }
    ],
    nav: [
      { description: "", id: 0, name: "沒設定" },
      { description: "new", id: 1, name: "最近更新" },
      { description: "designer", id: 2, name: "設計師版型" },
      { description: "board", id: 3, name: "棋牌版型" }
    ],
    color: [
      { id: 0, name: "沒設定" },
      { id: 1, name: "紅" },
      { id: 2, name: "黃" },
      { id: 3, name: "藍" }
    ],
    news: {
      imgPath: ["/v2/float/0-190509-100204.jpg"],
      isOpen: true,
      message:
        '<p><strong>aaaaaa</strong></p><h2>哈哈哈哈</h2><ul><li>hello</li><li>^^</li><li>&nbsp;</li><li>djsfisjfsdjfs</li></ul><blockquote><p>超級帥</p></blockquote><figure class="table"><table><tbody><tr><td>O</td><td>X</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>O</td><td>&nbsp;</td></tr><tr><td>O</td><td>&nbsp;</td><td>X</td></tr></tbody></table></figure>'
    }
  };
```

#### v1.2.4

1. 備份資料在 firebase

#### v1.2.0

1. fix bug

#### v1.1.2

1. try fix bug

#### v1.1.0

1. 簡易版本控制
2. 拖拉排序 (siteList 多拆一個 filterList)

#### v1.0.2

1. 多 siteType
2. 調整 overlay

#### v1.0.1

1. 給業務看過後調整版面

#### v1.0.0

1. 正式環境

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[8fae476](https://github.com/SimulatedGREG/electron-vue/tree/8fae4763e9d225d3691b627e83b9e09b56f6c935) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
