import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import { AtButton, AtTextarea, AtInput, AtForm, AtRange, AtSlider } from 'taro-ui'
import { connect } from '@tarojs/redux'

import { formatDate, formatTime } from '../../utils/util'
import { getTeacherCoursesData, addCourseData } from '../../actions/course'
import { SAVED, POSTED } from '../../constants/course'

import './addCourse.scss'

class AddCourse extends Component {
  config = {
    navigationBarTitleText: '添加课程'
  }

  state = {
    courseName: '',
    coursePrefix: '',
    courseSuffix: null,
    instructor: '',
    courseDescription: '',
    courseScale: [5, 10],
    courseScaleText: '5 ~ 10',
    courseDuration: 30,
    courseDateSel: formatDate(new Date()),
    courseTimeSel: formatTime(new Date()),
    courseLocation: '',
    courseState: ''
  }

  addCourse = async () => {
    // error checking
    this.state.courseState = POSTED
    await this.props.addCourse(this.state)
    this.props.getTeacherCourses()
    Taro.switchTab({
      url: '/pages/index/index'
    })
  }

  saveCourse = async () => {
    this.state.courseState = SAVED
    await this.props.addCourse(this.state)
    this.props.getTeacherCourses()
    Taro.switchTab({
      url: '/pages/index/index'
    })    
  }

  courseNameInput (courseName) {
    this.setState({
      courseName
    })
    return courseName
  }

  coursePrefixInput (coursePrefix) {
    this.setState({
      coursePrefix
    })
    return coursePrefix
  }

  courseSuffixInput (courseSuffix) {
    this.setState({
      courseSuffix
    })
    return courseSuffix
  }

  instructorInput (instructor) {
    this.setState({
      instructor
    })
    return instructor
  }

  courseDescriptionInput = e => {
    this.setState({
      courseDescription: e.target.value
    })  
  }

  courseScaleInput (courseScale) {
    this.setState({
      courseScale,
      courseScaleText: `${courseScale[0]}~${courseScale[1]}`
    })
    return courseScale
  }

  onCourseDurationInput (courseDuration) {
    this.setState({
      courseDuration: courseDuration.value
    })
  }

  onCourseDateChange = e => {
    this.setState({
      courseDateSel: e.detail.value
    })
  }

  onCourseTimeChange = e => {
    this.setState({
      courseTimeSel: e.detail.value
    })
  }

  courseLocationInput (courseLocation) {
    this.setState({
      courseLocation
    })
    return courseLocation
  }

  render () {
    return (
      <View className='index'>
        <AtForm 
          onSubmit={this.addCourse.bind(this)}
        >
          {/* course name */}
          <AtInput
            name='courseName'
            title='课程名称'
            type='text'
            placeholder='e.g.econ 101 mid term review'
            value={this.state.courseName}
            onChange={this.courseNameInput.bind(this)}
          />
          {/* course prefix */}
          <AtInput
            name='coursePrefix'
            title='学校课程前缀'
            type='text'
            placeholder='e.g.ECON'
            value={this.state.coursePrefix}
            onChange={this.coursePrefixInput.bind(this)}
          />
          {/* course suffix */}
          <AtInput
            name='courseSuffix'
            title='学校课程后缀'
            type='number'
            placeholder='e.g.102'
            value={this.state.courseSuffix}
            onChange={this.courseSuffixInput.bind(this)}
          />
          {/* instructor */}
          <AtInput
            name='instructor'
            title='学校的instructor'
            type='text'
            placeholder='e.g.Gainer,Alexander'
            value={this.state.instructor}
            onChange={this.instructorInput.bind(this)}
          />
          {/* description */}
          <AtTextarea
            maxLength={200}
            placeholder='e.g.这节课主讲supply和demand...'
            value={this.state.courseDescription}
            onChange={this.courseDescriptionInput.bind(this)}
          />
          {/* scale */}
          <Text>课程班人数：{this.state.courseScaleText}</Text>
          <AtRange
            value={this.state.courseScale}
            min={10}
            max={50}
            onChange={this.courseScaleInput.bind(this)}
          />
          {/* duration */}
          <Text>课程时长(min)</Text>
          <AtSlider 
            step={5} 
            min={30} 
            max={180}
            value={this.state.courseDuration}
            showValue
            onChange={this.onCourseDurationInput.bind(this)}
          />
          {/* start date */}
          <View>
            <Picker mode='date' onChange={this.onCourseDateChange}>
              开课日期：{this.state.courseDateSel}
            </Picker>
          </View>
          {/* start time */}
          <View>
            <Picker mode='time' onChange={this.onCourseTimeChange}>
              开课时间：{this.state.courseTimeSel}
            </Picker>
          </View>
          {/* location */}
          <AtInput
            name='location'
            title='上课地点'
            type='text'
            placeholder='e.g.Cameron'
            value={this.state.courseLocation}
            onChange={this.courseLocationInput.bind(this)}
          />
          {/* price */}
          {/* submit form */}
          <AtButton typle='primary' formType='submit'>添加课程</AtButton>
          <AtButton typle='secondary' onClick={this.saveCourse}>保存课程</AtButton>
        </AtForm>
      </View>
    )  
  }
}

export default connect(({course}) => ({course}), (dispatch) => ({
  async addCourse (...args) {
    await dispatch(addCourseData(...args))
  },
  getTeacherCourses () {
    dispatch(getTeacherCoursesData())
  }
})
)(AddCourse)