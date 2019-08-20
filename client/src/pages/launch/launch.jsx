import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
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
      <View>Launch</View>
    )
  }
}

export default connect(({teacher}) => ({teacher}), (dispatch) => ({
  async fetchTeacherData () {
    await dispatch(fetchTeacherData())
  }
})
)(Launch)