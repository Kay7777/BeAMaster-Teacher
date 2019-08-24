import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'


import './questions.scss'

export default class Questions extends Component {
  config = {
    navigationBarTitleText: '答疑'
  }

  
  render () {
    return (
        <View className="image">
                <Image  src="cloud://ts-dev-zehzs.7473-ts-dev-zehzs/系统图片/welcome.png" />
        </View>
    )
  }
}