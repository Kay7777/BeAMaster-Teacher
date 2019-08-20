import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton, AtCard } from 'taro-ui'
import { connect } from '@tarojs/redux'

import { getTeacherCoursesData } from '../../actions/course'
import { POSTED, SAVED } from '../../constants/course'

import './index.scss'

class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () {
    this.props.getTeacherCourses()
  }

  addCourse = () => {
    Taro.navigateTo({
      url: '/pages/addCourse/addCourse'
    })
  }

  courseDetail = (courseId) => {
    Taro.navigateTo({
      url: '/pages/detailCourse/detailCourse?courseId=' + courseId
    })
  }

  render () {
    let { teacherCourses } = this.props.course

    return (
      <View className='index'>
        <AtButton type='primary' onClick={this.addCourse}>添加课程</AtButton>
        <AtButton type='secondary' openType='contact'>联系客服</AtButton>
        <View>posted的课程</View>
        { Object.values(teacherCourses).filter(
            teacherCourse => teacherCourse.courseState === POSTED
          ).map(
            teacherCourse =>
              <AtCard 
                note={`${teacherCourse.courseDateSel} ${teacherCourse.courseTimeSel}`}
                extra={`${teacherCourse.courseDuration} min`}
                title={teacherCourse.courseName}
                onClick={this.courseDetail.bind(this, teacherCourse._id)}
              >
                {teacherCourse.courseDescription}
              </AtCard>
          )
        }
        <View>saved的课程</View>
        { Object.values(teacherCourses).filter(
            teacherCourse => teacherCourse.courseState === SAVED
          ).map(
            teacherCourse =>              
              <AtCard 
                note={`${teacherCourse.courseDateSel} ${teacherCourse.courseTimeSel}`}
                extra={`${teacherCourse.courseDuration} min`}
                title={teacherCourse.courseName}
                onClick={this.courseDetail.bind(this, teacherCourse._id)}
              >
                {teacherCourse.courseDescription}
              </AtCard>
          )
        }
      </View>
    )
  }
}

export default connect(({course}) => ({course}), (dispatch) => ({
  getTeacherCourses () {
    dispatch(getTeacherCoursesData())
  }
})
)(Index)