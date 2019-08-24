import Taro, { Component, downloadFile } from "@tarojs/taro"
import { View, Text, Image, Video, Swiper, SwiperItem } from "@tarojs/components"
import { AtAvatar, AtButton,AtFloatLayout } from 'taro-ui'
import '@tarojs/async-await'
import { connect } from '@tarojs/redux'
import { getWxUserData } from '../../utils/wx'
import './my.scss'
import { settings } from "cluster";

class My extends Component {
  config = {
    navigationBarTitleText: '我的'
  }

  state = {
    userInfo: {},
    image: null,
    video: null,
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

  render() {
    const { userInfo, image, video } = this.state
    image ? null : this.DownloadImage()
    video ? null : this.DownloadVideo()
    
    
    return (
      <View className='index'>
        <View>
          <Button open-type="openSetting" bindgetuserinfo="bindGetUserInfo">
            <View className='agreement'>请授权头像等信息，以便为您提供更好的服务></View>
          </Button>
          <View className="infor1">基本信息</View>
          <AtAvatar className="avatar" image={userInfo.avatarUrl} />
          <View className="infor2">名字： {this.props.teacher.name}</View>
          <View className="infor2">邮箱： {this.props.teacher.email}</View>
          <View className="infor2">学校： {this.props.teacher.university}</View>
        </View>
        <Image src={image} />
        <Video src={video} />
        <View className="add_btn">
          <AtButton className="btn" type='secondary' onClick={this.UploadImage.bind(this)}>上传照片</AtButton>
          <AtButton className="btn" type='secondary' onClick={this.UploadVideo.bind(this)}>上传视频</AtButton>
        </View>
        
      </View>
    )
  }
}

export default connect(({teacher}) => ({teacher}))(My)