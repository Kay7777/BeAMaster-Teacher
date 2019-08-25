import Taro from '@tarojs/taro'
import { getGlobalData } from '../constants/globalData'

async function getUserInfo () {
  const userData = getGlobalData('userData')
  if (userData) {
    return userData
  }
  try {
    const userData = await Taro.getUserInfo()
    return userData
  } catch (err) {
    console.log(err)
    console.log('微信登录或用户接口故障')
    return {}
  }
}

async function getOpenId () {
  let openId
  try {
    openId = Taro.getStorageSync('openid')
  } catch (error) {
    console.log(error)
  }
  if (openId) {
    return openId
  } else {
    const res = await Taro.cloud.callFunction({
      name: 'login',
      data: {}
    })
    const openId = res.result.openid
    Taro.setStorage({key: 'openid', data: openId})
    return openId
  }
}

export {
  getUserInfo,
  getOpenId
}