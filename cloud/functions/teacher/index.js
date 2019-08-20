const cloud = require('wx-server-sdk')

const { addTeacher } = require('./addTeacher.js')
const { getTeacher } = require('./getTeacher.js')

cloud.init()

exports.main = async (event, context) => {
  const db = cloud.database()
  const { func, data } = event
  let res
  if (func === 'addTeacher') {
    res = await addTeacher(db, data).catch(err => console.log(err))
  } else if (func === 'getTeacher') {
    res = await getTeacher(db, data).catch(err => console.log(err))
  }
  
  return {
    context,
    data: res
  }
}