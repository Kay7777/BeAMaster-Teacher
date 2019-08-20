async function getTeacher(db, data) {
  const { _openid } = data
  const teacherDB = db.collection('Teacher')
  let teacherData = {}

  const res = await teacherDB.where({_openid: _openid}).get();
  if (res.data.length !== 0) {
    teacherData = res.data[0]
  }
  return teacherData
}

exports.getTeacher = getTeacher