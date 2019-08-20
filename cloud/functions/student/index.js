// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

var db = cloud.database().collection('Student')

function getStudent(event, context) {
  return db.where({
    _openid: event.userInfo.openId
  }).get();
}

function addStudent(event, context) {
  return new Promise(function (resolve, reject) {
    db.add({
      data: {
        _openid: event.userInfo.openId,
        email: event.email,
        university: event.university
      },
      success: res => {
        console.log(res)
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

exports.main = async (event, context) => {
  console.log(event)
  console.log(context)

  if (event.type === 'add') {
    return addStudent(event, context)
  }
  else if (event.type === 'get') {
    return getStudent(event, context)
  }
}