import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux';
import { formatDate, formatTime } from '../../utils/util'
import { View, Text, Picker } from '@tarojs/components'
import { AtButton, AtTextarea, AtInput, AtForm, AtRange, AtSlider,AtModal } from 'taro-ui'
import './savedCourseDetail.scss'
import { getTeacherCoursesData, updateCourseData, deleteCourse } from '../../actions/course'
import { SAVED, POSTED } from '../../constants/course'

class SavedCourseDetail extends Component {
  config = {
    navigationBarTitleText: '课程修改'
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
    courseState: '',
    isOpened: false,
    price: ''
  }

  componentWillMount () {
    const params = this.$router.params
    let { 
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
    } = this.props.course.teacherCourses[params.courseId]
    this.setState({
      id: params.courseId,
      courseName, 
      coursePrefix, 
      courseSuffix,
      instructor,
      courseDescription,
      courseScale,
      courseScaleText: `${courseScale[0]}~${courseScale[1]}`,
      courseDuration,
      courseDateSel,
      courseTimeSel,
      courseLocation,
      courseState,
      price
    })
  }

  callPolicy = async () => {
    this.setState({isOpened:true})
    console.log(this.state)
  }

  // change it to posted course
  postCourse = async () => {
    this.state.courseState = POSTED
    await this.props.updateCourse(this.state)
    this.props.getTeacherCourses()
    Taro.switchTab({
      url: '/pages/index/index'
    })
  }

  cancelCourse = async () => {
    this.setState({isOpened:false})
  }

  // update course information
  updateCourse = async () => {
    this.state.courseState = SAVED
    await this.props.updateCourse(this.state)
    this.props.getTeacherCourses()    
  }

  deleteCourse = async() =>{
    await this.props.deleteCourse(this.state)
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

  priceInput (price) {
    this.setState({
      price
    })
    return price
  }

  render () {
    return (
      <View className='index'>
        
        <AtForm
          onSubmit={this.callPolicy}
        >
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
            title='课程前缀'
            type='text'
            placeholder='e.g.ECON'
            value={this.state.coursePrefix}
            onChange={this.coursePrefixInput.bind(this)}
          />
          {/* course suffix */}
          <AtInput
            name='courseSuffix'
            title='课程后缀'
            type='number'
            placeholder='e.g.102'
            value={this.state.courseSuffix}
            onChange={this.courseSuffixInput.bind(this)}
          />
          {/* instructor */}
          <AtInput
            name='instructor'
            title='Instructor'
            type='text'
            placeholder='e.g.Gainer,Alexander'
            value={this.state.instructor}
            onChange={this.instructorInput.bind(this)}
          />
          {/* description */}
          <AtTextarea
            maxLength={200}
            placeholder='e.g. 这节课将用两小时复习完 Math115 全部内容。'
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
          <AtInput
            name='price'
            title='价格 CAD/人/小时'
            type='number'
            placeholder='e.g. 20'
            value={this.state.price}
            onChange={this.priceInput.bind(this)}
          />
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
          <AtModal
            isOpened={this.state.isOpened}
            title='Policy'
            cancelText='取消'
            confirmText='同意'
            onCancel={ this.cancelCourse }
            onConfirm={ this.postCourse }
            content={
              '请仔细阅读Policy后，再点击同意提交课程。' + 
              '请仔细阅读Policy后，再点击同意提交课程。' + 
              '请仔细阅读Policy后，再点击同意提交课程。' + 
              '请仔细阅读Policy后，再点击同意提交课程。' + 
              '请仔细阅读Policy后，再点击同意提交课程。' + 
              '请仔细阅读Policy后，再点击同意提交课程。' + 
              '请仔细阅读Policy后，再点击同意提交课程。' + 
              '请仔细阅读Policy后，再点击同意提交课程。' + 
              '请仔细阅读Policy后，再点击同意提交课程。' + 
              '请仔细阅读Policy后，再点击同意提交课程。' + 
              '请仔细阅读Policy后，再点击同意提交课程。' + 
              '请仔细阅读Policy后，再点击同意提交课程。' + 
              '请仔细阅读Policy后，再点击同意提交课程。' + 
              '请仔细阅读Policy后，再点击同意提交课程。' + 
              '请仔细阅读Policy后，再点击同意提交课程。' + 
              '请仔细阅读Policy后，再点击同意提交课程。' + 
              '请仔细阅读Policy后，再点击同意提交课程。' + 
              '请仔细阅读Policy后，再点击同意提交课程。' + 
              '请仔细阅读Policy后，再点击同意提交课程。' + 
              '请仔细阅读Policy后，再点击同意提交课程。' + 
              '请仔细阅读Policy后，再点击同意提交课程。' + 
              '请仔细阅读Policy后，再点击同意提交课程。' + 
              '请仔细阅读Policy后，再点击同意提交课程。' + 
              '请仔细阅读Policy后，再点击同意提交课程。' + 
              '请仔细阅读Policy后，再点击同意提交课程。' + 
              '请仔细阅读Policy后，再点击同意提交课程。' + 
              '请仔细阅读Policy后，再点击同意提交课程。' 
            }
          />
          <AtButton formType='submit' type='primary'>发布</AtButton>
          <AtButton type='secondary' onClick={this.updateCourse} >更改</AtButton>
          <AtButton type='secondary' onClick={this.deleteCourse} >删除</AtButton>
        </AtForm>

      </View>
    )
  }
}

export default connect(({course}) => ({course}), (dispatch) => ({
  async postCourse (...args) {
    await dispatch(updateCourseData(...args))
  },
  async updateCourse(...args){
    await dispatch(updateCourseData(...args))
  },
  async deleteCourse(...args){
    await dispatch(deleteCourse(...args))
  },
  getTeacherCourses () {
    dispatch(getTeacherCoursesData())
  }
})
)(SavedCourseDetail)