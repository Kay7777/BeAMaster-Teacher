import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtButton, AtCard, AtRate, AtTabs, AtTabsPane } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { getTeacherCoursesData } from '../../actions/course'
import { POSTED, SAVED, CLOSED } from '../../constants/course'

import './index.scss'

class Index extends Component {
  config = {
    navigationBarTitleText: '线下课程'
  }
  state = {
    current: 0,
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  componentWillMount () {
    this.props.getTeacherCourses()
  }

  addCourse = () => {
    Taro.navigateTo({
      url: '/pages/addCourse/addCourse'
    })
  }

  postedCourseDetail =(courseId) => {
    Taro.navigateTo({
      url: '/pages/postedCourseDetail/postedCourseDetail?courseId=' + courseId
    })
  }

  savedCourseDetail = (courseId) => {
    Taro.navigateTo({
      url: '/pages/savedCourseDetail/savedCourseDetail?courseId=' + courseId
    })
  }
  

  render () {
    let { teacherCourses } = this.props.course
    const tabList = [{ title: '已发布' }, { title: '仅保存' }, { title: '已结束' }]
    return (
      <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;' >
            <View className="text">正在发布的课程</View>
            {Object.values(teacherCourses).filter(
              teacherCourse => teacherCourse.courseState === POSTED
            ).map(
              teacherCourse =>
                <AtCard 
                  note={`${teacherCourse.courseDateSel} ${teacherCourse.courseTimeSel} ${this.props.teacher.name}`}
                  extra={`${teacherCourse.courseDuration} min`}
                  title={teacherCourse.courseName}
                  onClick={this.postedCourseDetail.bind(this, teacherCourse._id)}
                >
                  <View className='at-row'>
                    <View className='at-col at-col-4'>
                      <Image className="courseCover" src="https://i.udemycdn.com/course/240x135/567828_67d0.jpg" />
                    </View>
                    <View className='at-col at-col-8'>
                      <View style="white-space: pre-wrap">{teacherCourse.courseDescription}</View>
                      <AtRate className="rate" value={4.5}/>        
                    </View>
                  </View>
                </AtCard>
            )
            }
            </View>
            <View className="add_btn">
              <AtButton className='btn' type='primary' onClick={this.addCourse}>添加课程</AtButton>
              {/* <AtButton className='btn' type='secondary' openType='contact'>联系客服</AtButton> */}
            </View> 
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>
            <View className="text">本地保存的课程</View>
            {Object.values(teacherCourses).filter(
              teacherCourse => teacherCourse.courseState === SAVED
            ).map(
              teacherCourse =>              
              <AtCard 
                note={`${teacherCourse.courseDateSel} ${teacherCourse.courseTimeSel} ${this.props.teacher.name}`}
                extra={`${teacherCourse.courseDuration} min`}
                title={teacherCourse.courseName}
                onClick={this.postedCourseDetail.bind(this, teacherCourse._id)}
              >
                <View className='at-row'>
                  <View className='at-col at-col-4'>
                    <Image className="courseCover" src="https://i.udemycdn.com/course/240x135/567828_67d0.jpg" />
                  </View>
                  <View className='at-col at-col-8'>
                    <View style="white-space: pre-wrap">{teacherCourse.courseDescription}</View>
                    <AtRate className="rate" value={4.5}/>        
                  </View>
                </View>
              </AtCard>
            )
            }
          </View>
          <View className="add_btn">
            <AtButton className='btn' type='primary' onClick={this.addCourse}>添加课程</AtButton>
            {/* <AtButton className='btn' type='secondary' openType='contact'>联系客服</AtButton> */}
          </View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2}>
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>
              <View className="text">已结束的课程</View>
            { Object.values(teacherCourses).filter(
                teacherCourse => teacherCourse.courseState === CLOSED
              ).map(
                teacherCourse =>              
                <AtCard 
                  note={`${teacherCourse.courseDateSel} ${teacherCourse.courseTimeSel} ${this.props.teacher.name}`}
                  extra={`${teacherCourse.courseDuration} min`}
                  title={teacherCourse.courseName}
                  onClick={this.postedCourseDetail.bind(this, teacherCourse._id)}
                >
                  <View className='at-row'>
                    <View className='at-col at-col-4'>
                      <Image className="courseCover" src="https://i.udemycdn.com/course/240x135/567828_67d0.jpg" />
                    </View>
                    <View className='at-col at-col-8'>
                      <View style="white-space: pre-wrap">{teacherCourse.courseDescription}</View>
                      <AtRate className="rate" value={4.5}/>        
                    </View>
                  </View>
                </AtCard>
              )
            }
          </View>
        </AtTabsPane>
      </AtTabs>
    )
  }
}

export default connect(({course, teacher}) => ({course, teacher}), (dispatch) => ({
  async getTeacherCourses () {
    await dispatch(getTeacherCoursesData())
  },
})
)(Index)