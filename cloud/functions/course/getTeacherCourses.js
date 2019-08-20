async function getTeacherCourses(db, data) {
  const { _openid } = data
  const courseDB = db.collection('Course')
  const res = await courseDB.where({_openid: _openid}).get();
  return res.data
}

exports.getTeacherCourses = getTeacherCourses