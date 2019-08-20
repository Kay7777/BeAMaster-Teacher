import Taro, { Component } from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import { AtAvatar } from 'taro-ui'
import '@tarojs/async-await'
import { connect } from '@tarojs/redux'

import { getWxUserData } from '../../utils/wx'

class My extends Component {
  config = {
    navigationBarTitleText: '我的'
  }

  state = {
    userInfo: {}
  }

  async componentWillMount () {
    const { userInfo } = await getWxUserData()
    this.setState({
      userInfo: userInfo
    })
  }  

  render() {
    const { userInfo } = this.state
    return (
      <View className='index'>
        <AtAvatar image={userInfo.avatarUrl} />
        <View>{userInfo.nickName}</View>
        <View>{this.props.teacher.email}</View>
        <View>{this.props.teacher.university}</View>
      </View>
    )
  }
}

export default connect(({teacher}) => ({teacher}))(My)