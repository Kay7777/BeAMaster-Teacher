import Taro, { Component, downloadFile } from "@tarojs/taro"
import { View, Text, Image, Video, Swiper, SwiperItem } from "@tarojs/components"
import { AtAvatar, AtButton } from 'taro-ui'
import '@tarojs/async-await'
import { connect } from '@tarojs/redux'
import { getWxUserData } from '../../utils/wx'

class My extends Component {
  config = {
    navigationBarTitleText: '我的'
  }

  state = {
    userInfo: {},
    image: null,
    video: null
  }

  async componentWillMount () {
    const { userInfo } = await getWxUserData()
    console.log(userInfo)
    this.setState({
      userInfo: userInfo
    })
  }  

  DownloadImage = async () => {
    const email = this.props.teacher.email
    await Taro.cloud.downloadFile({
      fileID: `cloud://ts-dev-zehzs.7473-ts-dev-zehzs-1259245386/${email}/picture`,
    }).then((res) => {
      this.setState({image: res.tempFilePath})
    }).catch(console.error);
  }

  DownloadVideo = async () => {
    const email = this.props.teacher.email
    await Taro.cloud.downloadFile({
      fileID: `cloud://ts-dev-zehzs.7473-ts-dev-zehzs-1259245386/${email}/video`,
    }).then((res) => {
      this.setState({video: res.tempFilePath})
    }).catch(console.error);
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
    .then(res => this.setState({image: res.fileID}))
  }

  UploadVideo = async ()=> {
    const res = await Taro.chooseVideo({
      sourceType: ['album', 'camera'],
      compressed: true,
    })
    await Taro.cloud.uploadFile({
      cloudPath: `${this.props.teacher.email}/video`,
      filePath: res.tempFilePath
    }).then(res => {
      this.setState({video: res.fileID})
      return res.fileID
    })
  }

  // UploadText = async () => {

  // }

  render() {
    const { userInfo, image, video } = this.state
    image ? null : this.DownloadImage()
    video ? null : this.DownloadVideo()
    
    
    return (
      <View className='index'>
        <AtAvatar image={userInfo.avatarUrl} />
        <View>{userInfo.nickName}</View>
        <View>{this.props.teacher.email}</View>
        <View>{this.props.teacher.university}</View>
        {/* <AtTextarea
        value={text}
        onChange={this.UploadText.bind(this)}
        maxLength={200}
        placeholder='请介绍你自己！'
        /> */}
        

        <Image src={image} />
        <Video src={video} />
        <AtButton type='secondary' onClick={this.UploadImage.bind(this)}>上传照片</AtButton>
        <AtButton type='secondary' onClick={this.UploadVideo.bind(this)}>上传视频</AtButton>
      </View>
    )
  }
}

export default connect(({teacher}) => ({teacher}))(My)