import Taro from '@tarojs/taro'

function isEmptyObject (obj) {
  if (!obj) { 
    return true
  }
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false
    }
  }
  return true
}

function getSystemInfo () {
  const systemInfo = Taro.getSystemInfoSync() || {
    model: ''
  }
  systemInfo.isIpx = systemInfo.model && systemInfo.model.indexOf('iPhone X') > -1 ? true : false
  return systemInfo
}

function formatDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate() 
  return [year, month, day].map(formatNumber).join('-')
}

function formatTime(date) {
  var hour = date.getHours()
  var minute = date.getMinutes()
  return [hour, minute].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const arrayToObject = (array, keyField) =>
   array.reduce((obj, item) => {
     obj[item[keyField]] = item
     return obj
   }, {})

export {
  isEmptyObject,
  getSystemInfo,
  formatDate,
  formatTime,
  arrayToObject
}