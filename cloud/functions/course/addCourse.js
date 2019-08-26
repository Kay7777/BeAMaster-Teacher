async function addCourse(db, data) {
  const {
    _openid,
    courseName, 
    coursePrefix, 
    courseSuffix, 
    instructor, 
    courseDescription, 
    courseScale, 
    courseDuration, 
    courseDateSel, 
    courseTimeSel,
    courseLocation,
    courseState,
    price
  } = data
  const courseDB = db.collection('Course')
  await courseDB.add({
    data: {
      _openid: _openid,
      courseName: courseName,
      coursePrefix: coursePrefix,
      courseSuffix: courseSuffix,
      instructor: instructor,
      courseDescription: courseDescription,
      courseScale: courseScale,
      courseDuration: courseDuration,
      courseDateSel: courseDateSel,
      courseTimeSel: courseTimeSel,
      courseLocation: courseLocation,
      courseState: courseState,
      price: price
    }
  })
  return data
}

exports.addCourse = addCourse
