import Taro, { Component } from "@tarojs/taro"
import { Image, Video, View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton } from 'taro-ui'

class Promotion extends Component {
    config = {
        navigationBarTitleText:"宣传页设计"
    }
    
    UploadImage = async ()=> {
        const res = await Taro.chooseImage({
          sourceType: ['album', 'camera'],
          sizeType: ['original', 'compressed'],
          count: 1
        })
        await Taro.cloud.uploadFile({
          cloudPath: `${this.props.teacher.email}/picture`,
          filePath: res.tempFilePaths[0]
        })
    }
    
    UploadVideo = async ()=> {
        const res = await Taro.chooseVideo({
          sourceType: ['album', 'camera'],
          compressed: true,
        })
        await Taro.cloud.uploadFile({
          cloudPath: `${this.props.teacher.email}/video`,
          filePath: res.tempFilePath
        })
    }

    render() {
        const email = this.props.teacher.email

        return (
            <View className='index'>
                <Image src={`cloud://ts-dev-zehzs.7473-ts-dev-zehzs-1259245386/${email}/picture`} />
                <Video src={`cloud://ts-dev-zehzs.7473-ts-dev-zehzs-1259245386/${email}/video`} />
                <View className="add_btn">
                    <AtButton className="btn" type='secondary' onClick={this.UploadImage.bind(this)}>上传照片</AtButton>
                    <AtButton className="btn" type='secondary' onClick={this.UploadVideo.bind(this)}>上传视频</AtButton>
                </View>
                
            </View>
        )
    }
}

export default connect(({teacher}) => ({teacher}))(Promotion)