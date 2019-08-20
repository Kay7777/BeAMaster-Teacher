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
    courseState
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
      courseState: courseState
    }
  })
  return data
}

exports.addCourse = addCourse

// function getCourse(event, context) {
//   return db.where({
//     _id: event.courseId,
//   }).get();
// }

// function searchCourses(event, context) {
//   return db.where({
//     university: event.university,
//     courseName: {
//       $regex: '.*' + event.query,
//       $options: 'i'
//     },
//     // professor: {
//     //   $regex: '.*' + event.query,
//     //   $options: 'i'
//     // }
//   }).get();
// }