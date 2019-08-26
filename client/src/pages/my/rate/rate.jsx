import Taro, { Component } from "@tarojs/taro"
import { View } from '@tarojs/components'
import { AtAvatar, AtRate } from 'taro-ui'
import { connect } from '@tarojs/redux'

class Rate extends Component {
    config = {
        navigationBarTitleText:"课程评分"
    }

    state = {
        userInfo: {},
        value: 5
    }

    handleChange (value) {
        this.setState({
          value
        })
    }


    render () {
        return (
            <View className='index'>
                <AtRate size='15' value={this.state.value} onChange={this.handleChange} />
            </View>
                
            
        )
    }
}

export default connect(({teacher}) => ({teacher}))(Rate)