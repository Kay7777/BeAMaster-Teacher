import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import './signup.scss'

export default class Signup extends Component {
  config = {
    navigationBarTitleText: '注册'
  }

  signupUniversity = () => {
    Taro.navigateTo({
      url: '/pages/signupUniversity/signupUniversity'
    })
  }

  render () {
    return (
      <View className='index'>
        <AtButton type='primary' onClick={this.signupUniversity}>注册</AtButton>
      </View>
    )
  }
}