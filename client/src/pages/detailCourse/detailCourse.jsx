import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import { formatDate, formatTime } from '../../utils/util'

import './detailCourse.scss'

class DetailCourse extends Component {
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
    courseState: ''
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
      courseState 
    } = this.props.course.teacherCourses[params.courseId]
    this.setState({
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
      courseState      
    })
    
  }

  render () {
    return (
      <View className='index'>
        <AtForm 
          onSubmit={this.postCourse.bind(this)}
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

        </AtForm>
      </View>
    )
  }
}

export default connect(({course}) => ({course}))(DetailCourse)