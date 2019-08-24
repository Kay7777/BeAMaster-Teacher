async function addTeacher(db, data) {
  const { _openid, name, email, university  } = data
  const teacherDB = db.collection('Teacher')
  await teacherDB.add({
    data: {
      _openid: _openid,
      name: name,
      email: email,
      university: university
    }
  })
  return data
}

exports.addTeacher = addTeacher