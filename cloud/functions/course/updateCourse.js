async function updateCourse(db, data) {

    const courseDB = db.collection('Course')
    const {
        _id,
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

    await courseDB.doc(_id).update({
        data: {
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
        },
        success: function(res) {
          console.log(res.data)
        }
    })

    return data
  }
  
  exports.updateCourse = updateCourse