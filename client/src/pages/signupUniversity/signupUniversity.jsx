import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import './signupUniversity.scss'

export default class SignupUniversity extends Component {
  config = {
    navigationBarTitleText: '注册大学'
  }
  
  state = {
    selector: ['University of Alberta', 'University of Toronto'],
    selectorChecked: 'University of Alberta'
  }

  onChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  }

  signupEmail = () => {
    Taro.navigateTo({
      url: '/pages/signupEmail/signupEmail?university=' + this.state.selectorChecked
    })
  }

  render () {
    return (
      <View className='index'>
        <Text>选择大学</Text>
        <View>
          <Picker mode='selector' range={this.state.selector} onChange={this.onChange}>
            <View className='picker'>
              当前选择: {this.state.selectorChecked}
            </View>
          </Picker>
          <AtButton type='primary' onClick={this.signupEmail}>下一步</AtButton>
        </View>      
      </View>
    )
  }  
}