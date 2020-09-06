import fs from 'fs'
import firebase from './firebase'
import Client from 'ftp'
import path from 'path'
import download from 'download'

var ftp = {
  test: async function () {
    var ftpInfo = await firebase.getFtpPath()

    var c = new Client()
    c.on('ready', function () {
      c.cwd(ftpInfo.prefix, function (err) {
        if (err) throw err
        c.list(function (err, list) {
          if (err) throw err
          console.log(list)
          c.end()
        })
      })
    })
    c.connect({
      host: ftpInfo.domain,
      port: ftpInfo.port,
      user: ftpInfo.user,
      password: ftpInfo.password
    })
  },
  updateData: async function (data) {
    var dataBasename = path.basename(data)
    var ftpInfo = await firebase.getFtpPath()
    dataBasename = ftpInfo.prefix + dataBasename

    return new Promise((resolve, reject) => {
      var c = new Client()
      c.on('ready', function () {
        c.put(data, dataBasename, function (err) {
          if (err) {
            reject()
            // throw err
          } else {
            console.log('put data')
            c.end()
            resolve()
          }
        })
      })
      c.connect({
        host: ftpInfo.domain,
        port: ftpInfo.port,
        user: ftpInfo.user,
        password: ftpInfo.password
      })
    })
  },
  updateImages: async function (absoluteImgs, baseImgs, id, websiteName) {
    var ftpInfo = await firebase.getFtpPath()
    var folder = id === 'float' ? id : id + '_' + websiteName
    var isHaveFolder = false

    return new Promise((resolve, reject) => {
      var c = new Client()
      c.on('ready', function () {
        c.cwd(ftpInfo.prefix + ftpInfo.imageFolder, function (err) {
          if (err) throw err
          c.list(function (err, list) {
            if (err) throw err
            console.log(list)
            list.forEach(doc => {
              if (doc.name === folder) {
                isHaveFolder = true
              }
            })
            if (!isHaveFolder) {
              c.mkdir(folder, function (err) {
                if (err) throw err
              })
            }

            var imgPromises = new Array(absoluteImgs.length)
            for (var i = 0; i < absoluteImgs.length; i++) {
              var noPrefixBaseImg = baseImgs[i].replace('/v2/images/', './')
              imgPromises[i] = new Promise((resolve, reject) => {
                console.log(noPrefixBaseImg)
                c.put(absoluteImgs[i], noPrefixBaseImg, function (err) {
                  if (err) throw err
                  console.log('trans img done')
                  resolve()
                })
              })
            }
            Promise.all(imgPromises).then(() => {
              console.log('end connect')
              c.end()
              resolve()
            })
          })
        })
      })
      // // connect to localhost:21 as anonymous
      c.connect({
        host: ftpInfo.domain,
        port: ftpInfo.port,
        user: ftpInfo.user,
        password: ftpInfo.password
      })
    })
  },
  getData: async function (data) {
    data = 'https://raw.githubusercontent.com/robben5566/practiceTxt/master/result.txt' + Date.now()
    return new Promise((resolve, reject) => {
      download(data).then(res => {
        console.log('get data done!')
        fs.writeFileSync('./result.json', res, 'utf8')
        var resData = fs.readFileSync('./result.json', 'utf8')
        resolve(resData)
      })
    })
  },
  updateJSONToFTPV2: async function (jsonContent) {
    var txtPath = './v2/data.txt'
    if (!fs.existsSync('./v2')) {
      fs.mkdirSync('./v2')
    }

    await fs.writeFileSync(txtPath, jsonContent)
    var message = await this.updateData(txtPath)

    return new Promise((resolve, reject) => {
      console.log('updateJSONtoFTP - down')
      resolve(message)
    })
  }
}
export default ftp
