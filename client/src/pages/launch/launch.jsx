import Taro, { Component } from '@tarojs/taro'
import { View, Button,Image } from '@tarojs/components'
import { AtLoadMore } from 'taro-ui'
import { connect } from '@tarojs/redux'
import './launch.scss'
import { fetchTeacherData } from '../../actions/teacher';

class Launch extends Component {
  config = {
    navigationBarTitleText: 'Launch'
  }

  componentWillMount () { 
    let timer = setTimeout(() => {
      clearTimeout(timer)
      this.direct()
    }, 2000)
  }

  direct = async () => {
    await this.props.fetchTeacherData()
    if (this.props.teacher.isLogged) {
      Taro.switchTab({
        url: '/pages/index/index'
      })
    } else {
      Taro.navigateTo({
        url: '/pages/signup/signup'
      })
    }
  }

  render () {
    return (
      <View class="test-bg">
        <Image class='bg-image' mode="scaleToFill" src='cloud://ts-dev-zehzs.7473-ts-dev-zehzs/landing.jpg'/>
      </View>

    )
  }
}

export default connect(({teacher}) => ({teacher}), (dispatch) => ({
  async fetchTeacherData () {
    await dispatch(fetchTeacherData())
  }
})
)(Launch)