import Taro, { Component } from '@tarojs/taro'
import { View, Image, Canvas } from '@tarojs/components'

import './onlineCourse.scss'

export default class onlineCourse extends Component {
  config = {
    navigationBarTitleText: '在线课程'
  }
  
  render () {
    return (
      <View className="image">
            <Image  src="cloud://ts-dev-zehzs.7473-ts-dev-zehzs/系统图片/welcome.png" />
      </View>
    )
  }
}