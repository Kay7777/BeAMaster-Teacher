import Taro from '@tarojs/taro'

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
  getOpenId
}