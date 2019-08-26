import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux';
import { formatDate, formatTime } from '../../utils/util'
import { View, Text, Picker, Image } from '@tarojs/components'
import './postedCourseDetial.scss'
import { AtButton, AtTextarea, AtModal, AtInput, AtForm, AtRange, AtSlider } from 'taro-ui'
import { getTeacherCoursesData, updateCourseData, deleteCourse } from '../../actions/course'
import { POSTED } from '../../constants/course'

// base on the policy, then decide the teacher can change the course details or not
let isDisabled = true;

class PostedCourseDetail extends Component {
  config = {
    navigationBarTitleText: '课程细节'
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
    price: '',
    isOpened: false,
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
  // update course information
  updateCourse = async () => {
    this.state.courseState = POSTED
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

  uploadQR = async ()=> {
    const res = await Taro.chooseImage({
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      count: 1
    })
    await Taro.cloud.uploadFile({
      cloudPath: `${this.props.teacher.email}/${this.state.id}/QR`,
      filePath: res.tempFilePaths[0]
    })
  }
  callPolicy = async () => {
    this.setState({isOpened:true})
  }

  cancelPolicy = async () => {
    this.setState({isOpened:false})
  }

  scanQR = async () => {
    Taro.previewImage({
      urls:[`cloud://ts-dev-zehzs.7473-ts-dev-zehzs-1259245386/${this.props.teacher.email}/${this.state.id}/QR`]
    })
  }
  


  

  render () {
    const email = this.props.teacher.email
    

    return (
      <View className='index'>
        <AtForm>
          <AtInput
            disabled={isDisabled}
            name='courseName'
            title='课程名称'
            type='text'
            placeholder='e.g.econ 101 mid term review'
            value={this.state.courseName}
            onChange={this.courseNameInput.bind(this)}
          />
          {/* course prefix */}
          <AtInput
            disabled={isDisabled}
            name='coursePrefix'
            title='课程前缀'
            type='text'
            placeholder='e.g.ECON'
            value={this.state.coursePrefix}
            onChange={this.coursePrefixInput.bind(this)}
          />
          {/* course suffix */}
          <AtInput
            disabled={isDisabled}
            name='courseSuffix'
            title='课程后缀'
            type='number'
            placeholder='e.g.102'
            value={this.state.courseSuffix}
            onChange={this.courseSuffixInput.bind(this)}
          />
          {/* instructor */}
          <AtInput
            disabled={isDisabled}
            name='instructor'
            title='Instructor'
            type='text'
            placeholder='e.g.Gainer,Alexander'
            value={this.state.instructor}
            onChange={this.instructorInput.bind(this)}
          />
          {/* description */}
          <AtTextarea
            disabled={isDisabled}
            maxLength={200}
            placeholder='e.g. 这节课将用两小时复习完 Math115 全部内容。'
            value={this.state.courseDescription}
            onChange={this.courseDescriptionInput.bind(this)}
          />
          {/* scale */}
          <Text>课程班人数：{this.state.courseScaleText}</Text>
          <AtRange
            disabled={isDisabled}
            value={this.state.courseScale}
            min={10}
            max={50}
            onChange={this.courseScaleInput.bind(this)}
          />
          {/* duration */}
          <Text>课程时长(min)</Text>
          <AtSlider 
            disabled={isDisabled}
            step={5} 
            min={30} 
            max={180}
            value={this.state.courseDuration}
            showValue
            onChange={this.onCourseDurationInput.bind(this)}
          />
          <AtInput
            disabled={isDisabled}
            name='price'
            title='价格 CAD/人/小时'
            type='number'
            placeholder='e.g. 20'
            value={this.state.price}
            onChange={this.priceInput.bind(this)}
          />
          {/* start date */}
          <View>
            <Picker disabled={isDisabled} mode='date' onChange={this.onCourseDateChange}>
              开课日期：{this.state.courseDateSel}
            </Picker>
          </View>
          {/* start time */}
          <View>
            <Picker disabled={isDisabled} mode='time' onChange={this.onCourseTimeChange}>
              开课时间：{this.state.courseTimeSel}
            </Picker>
          </View>
          {/* location */}
          <AtInput
            disabled={isDisabled}
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
            onCancel={ this.cancelPolicy }
            onConfirm={ this.deleteCourse }
            content={'请仔细阅读Policy后，再点击同意提交课程。'+
            '请仔细阅读Policy后，再点击同意提交课程。'+
            '请仔细阅读Policy后，再点击同意提交课程。'+
            '请仔细阅读Policy后，再点击同意提交课程。'+
            '请仔细阅读Policy后，再点击同意提交课程。'+
            '请仔细阅读Policy后，再点击同意提交课程。'+
            '请仔细阅读Policy后，再点击同意提交课程。'+
            '请仔细阅读Policy后，再点击同意提交课程。'+
            '请仔细阅读Policy后，再点击同意提交课程。'+
            '请仔细阅读Policy后，再点击同意提交课程。'+
            '请仔细阅读Policy后，再点击同意提交课程。'+
            '请仔细阅读Policy后，再点击同意提交课程。'+
            '请仔细阅读Policy后，再点击同意提交课程。'+
            '请仔细阅读Policy后，再点击同意提交课程。'+
            '请仔细阅读Policy后，再点击同意提交课程。'+
            '请仔细阅读Policy后，再点击同意提交课程。'+
            '请仔细阅读Policy后，再点击同意提交课程。'+
            '请仔细阅读Policy后，再点击同意提交课程。'+
            '请仔细阅读Policy后，再点击同意提交课程。'+
            '请仔细阅读Policy后，再点击同意提交课程。'+
            '请仔细阅读Policy后，再点击同意提交课程。'+
            '请仔细阅读Policy后，再点击同意提交课程。'
            }
          />       
          <Image className="QR" onClick={this.scanQR}
            src={`cloud://ts-dev-zehzs.7473-ts-dev-zehzs-1259245386/${email}/${this.state.id}/QR`} 
            data-src={`cloud://ts-dev-zehzs.7473-ts-dev-zehzs-1259245386/${email}/${this.state.id}/QR`}
            />
          <AtButton disabled={isDisabled} type='primary' onClick={this.updateCourse} >更改</AtButton>
          <AtButton disabled={!isDisabled} type='secondary' onClick={this.uploadQR} >提交群组二维码</AtButton>
          <AtButton className="delete" type='secondary' onClick={this.callPolicy.bind(this)} >删除</AtButton>
        </AtForm>
      </View>
    )
  }
}

export default connect(({course, teacher}) => ({course, teacher}), (dispatch) => ({
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
)(PostedCourseDetail)