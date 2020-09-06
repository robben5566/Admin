// This import loads the firebase namespace along with all its type information.
import * as firebase from 'firebase/app'

// These imports load individual services into the firebase namespace.
import 'firebase/auth'
import 'firebase/firestore'

import firebaseConfig from '../../../firebase.Config.js'

firebase.initializeApp(firebaseConfig)
var db = firebase.firestore()

var maxIdHash = 'xxx'
var maxOpIdHash = 'xxx'
var ftpHash = 'xxx'
var versionHash = 'xxx'

var _db = {
  getVersion: function () {
    let maxVerRef = db.collection('version').doc(versionHash)

    return new Promise((resolve, reject) => {
      maxVerRef.get().then(doc => {
        if (!doc.exists) {
          reject(new Error('No Version'))
        } else {
          resolve(doc.data().v)
        }
      })
    })
  },
  createCode: function (code) {
    let docRef = db.collection('codes').doc(code.code)
    return docRef.set({ code }).then();
  },
  getCode: function (code) {
    let codeRef = db.collection('codes').doc(code)

    return new Promise((resolve, reject) => {
      codeRef.get().then(doc => {
        if (!doc.exists) {
          reject(new Error('No Register Code'))
        } else {
          resolve(doc.data())
        }
      })
    })
  },
  updateCode: function (code) {
    let codeRef = db.collection('codes').doc(code.code)
    return codeRef.set(code).then();
  },
  getMaxUserId: async function () {
    let maxIdRef = db.collection('maxId').doc(maxIdHash)

    return new Promise((resolve, reject) => {
      maxIdRef.get().then(doc => {
        if (!doc.exists) {
          reject(new Error('No MaxUserId'))
        } else {
          resolve(doc.data().maxId)
        }
      })
    })
  },
  updateMaxUserId: function (id) {
    let maxIdRef = db.collection('maxId').doc(maxIdHash)
    return maxIdRef.update({ maxId: id }).then()
  },
  getAccount: function (obj) {
    let maxAccountRef = db.collection('users').doc(obj.account)

    return new Promise((resolve, reject) => {
      maxAccountRef.get().then(doc => {
        if (!doc.exists) {
          reject()
        } else {
          resolve(doc.data())
        }
      })
    })
  },
  updateAccount: async function (obj) {
    var isAccExist = await _db.getAccount(obj)
    if (isAccExist) {
      return Promise.reject();
    } else {
      await _db.updateMaxUserId(obj.id)
      let maxAccountRef = db.collection('users').doc(obj.account)
      await maxAccountRef.set(obj)
      return Promise.resolve();
    }
  },
  getFtpPath: async function () {
    let ftpRef = db.collection('ftp').doc(ftpHash)

    return new Promise((resolve, reject) => {
      ftpRef.get().then(doc => {
        if (!doc.exists) {
          reject(new Error('No ftp data'))
        } else {
          resolve(doc.data())
        }
      })
    })
  },
  // TODO
  getOpRecord: async function () {
    let ftpRef = db.collection('opRecord')
    let outArr = []
    return new Promise((resolve, reject) => {
      ftpRef
        .orderBy('id', 'desc')
        .limit(100)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            reject();
          } else {
            outArr = snapshot.docs.map(d => d.data())
            resolve(outArr)
          }
        })
    })
  },
  addOpRecord: function (opRecord) {
    return _db.updateMaxOpId(opRecord.id).then(() => {
      return new Promise(resolve => {
        let docRef = db.collection('opRecord')
        docRef.add(opRecord).then(() => {
          resolve()
        })
      })
    })
  },
  getMaxOpId: function () {
    let maxIdRef = db.collection('maxId').doc(maxOpIdHash)

    return new Promise((resolve, reject) => {
      maxIdRef.get().then(doc => {
        if (!doc.exists) {
          reject(new Error('No MaxUserId'))
        } else {
          resolve(doc.data().maxOpId)
        }
      })
    })
  },
  updateMaxOpId: function (id) {
    let maxIdRef = db.collection('maxId').doc(maxOpIdHash)
    return maxIdRef.update({ maxOpId: id }).then()
  },
  addOldData: function (data) {
    let maxIdRef = db.collection('oldData')
    return maxIdRef.add(data).then()
  },
  getOldData: function () {
    let ftpRef = db.collection('oldData')
    let outArr = []
    return new Promise((resolve, reject) => {
      ftpRef
        .orderBy('lastUpdateTime', 'desc')
        .limit(20)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            reject()
          } else {
            outArr = snapshot.docs.map(d => d.data())
            resolve(outArr)
          }
        })
    })
  }
}
export default _db
