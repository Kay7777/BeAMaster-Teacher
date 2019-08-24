import Taro, { Component } from "@tarojs/taro"
import { View, Button } from "@tarojs/components"
import '@tarojs/async-await'
import { connect } from '@tarojs/redux'
import './my.scss'

class My extends Component {
  config = {
    navigationBarTitleText: '我的'
  }

  state = {
    userInfo: {},
  }

  toPromotion =()=> {
    Taro.navigateTo({
      url: '/pages/my/promotion/promotion'
    })
  }

  toRate =()=> {
    Taro.navigateTo({
      url: '/pages/my/rate/rate'
    })
  }

  toSetting =()=> {
    Taro.navigateTo({
      url: '/pages/my/profile/profile'
    })
  }

  toWallet =()=> {
    Taro.navigateTo({
      url: '/pages/my/wallet/wallet'
    })
  }

  

  render() {
    return (
      <View className='index'>
          {/* <AtButton open-type="openSetting" bindgetuserinfo="bindGetUserInfo">
            <View className='agreement'>请授权头像等信息，以便为您提供更好的服务></View>
          </AtButton> */}
          <Button onClick={this.toSetting}>设置</Button>
          <Button onClick={this.toPromotion}>宣传页</Button>
          <Button onClick={this.toRate}>评分</Button>
          <Button onClick={this.toWallet}>钱包</Button>
      </View>
    )
  }
}

export default connect(({teacher}) => ({teacher}))(My)