const cloud = require('wx-server-sdk')

const { addCourse } = require('./addCourse.js')
const { getTeacherCourses } = require('./getTeacherCourses.js')

cloud.init()

exports.main = async (event, context) => {
  const db = cloud.database()
  const {func, data} = event
  let res
  if (func === 'addCourse') {
    res = await addCourse(db, data).catch(err => console.log(err))
  }  else if (func === 'getTeacherCourses') {
    res = await getTeacherCourses(db, data).catch(err => console.log(err))
  }

  return {
    context,
    data: res
  }
}