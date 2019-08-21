async function deleteCourse(db, data) {

    const courseDB = db.collection('Course')
    const { _id } = data

    console.log(_id)

    await courseDB.doc(_id).remove({
        success: function (res) {
            console.log('success:', res);
          },
          fail: function (res) {
            console.log('fail:', res);
          }
    })

    return data
  }
  
  exports.deleteCourse = deleteCourse