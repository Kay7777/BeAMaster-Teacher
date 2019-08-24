import Taro, { Component } from "@tarojs/taro"
import { View } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import { connect } from '@tarojs/redux'

class Profile extends Component {
    config = {
        navigationBarTitleText:"个人信息"
    }

    state = {
        userInfo: {},
    }

    async componentWillMount () {
        const { userInfo } = await getWxUserData()
        console.log(userInfo)
        this.setState({
          userInfo: userInfo
        })
    }  

    render () {
        const { userInfo } = this.state
        return (
            <View className='index'>
                <View className="infor1">基本信息</View>
                <AtAvatar className="avatar" image={userInfo.avatarUrl} />
                <View className="infor2">名字： {this.props.teacher.name}</View>
                <View className="infor2">邮箱： {this.props.teacher.email}</View>
                <View className="infor2">学校： {this.props.teacher.university}</View>
            </View>
                
            
        )
    }
}

export default connect(({teacher}) => ({teacher}))(Profile)