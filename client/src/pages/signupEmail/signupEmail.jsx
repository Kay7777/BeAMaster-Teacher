import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton, AtInput } from 'taro-ui'
import { connect } from '@tarojs/redux'

import { addTeacherData } from '../../actions/teacher'

import './signupEmail.scss'

class SignupEmail extends Component {
  config = {
    navigationBarTitleText: '注册邮箱'
  }

  state = {
    university: '',
    emailPrefix: '',
    teacherName: '',
    university_email: {
      'University of Alberta': 'ualberta.ca',
      'University of Toronto': 'utoronto.ca'
    }
  }
  
  componentWillMount () {
    const params = this.$router.params
    this.setState({
      university: params.university,
      teacherName: params.teacherName
    })
  }
  
  signup = async () => {
    const email = `${this.state.emailPrefix}@${this.state.university_email[this.state.university]}`
    await this.props.addTeacher(email, this.state.university, this.state.teacherName)
    if (this.props.teacher.isLogged) {
      Taro.switchTab({
        url: '/pages/index/index'
      })
    }
  }

  handleChange (emailPrefix) {
    this.setState({
      emailPrefix
    })
    return emailPrefix
  }

  render () {
    return (
      <View className='index'>
        <AtInput
          name='value'
          title='邮箱'
          type='text'
          placeholder='邮箱'
          value={this.state.emailPrefix}
          onChange={this.handleChange.bind(this)}>
        @{this.state.university_email[this.state.university]}
        </AtInput>
        <AtButton type='primary' onClick={this.signup}>完成注册</AtButton>
      </View>
    )
  }  
}

export default connect(({teacher}) => ({teacher}), (dispatch) => ({
  async addTeacher (...args) {
    await dispatch(addTeacherData(...args))
  }
})
)(SignupEmail)