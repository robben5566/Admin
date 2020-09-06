import bcrypt from 'bcrypt'
const saltRounds = 10

var pwHash = {
  encode: async function(pw) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(pw, saltRounds, (err, hash) => {
        if (err) {
          console.log(err)
        } else {
          resolve(hash)
        }
      })
    })
  },
  decode: async function(hash, pw) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(pw, hash, function(err, res) {
        // res == true
        if (err) {
          console.log(err)
        } else {
          if (res === true) {
            console.log('pw compare true!')
            resolve(true)
          } else {
            console.log('pw compare false!')
            resolve(false)
          }
        }
      })
    })
  }
}
export default pwHash
