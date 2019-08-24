import Taro from '@tarojs/taro'
import { createAction } from 'redux-actions'

import {
  REQUEST_TEACHER_INFO,
  RECEIVE_TEACHER_INFO,
  RECEIVE_NO_TEACHER_INFO,
  REQUEST_ADD_TEACHER,
  RECEIVE_ADD_TEACHER
} from '../constants/teacher'

import { getOpenId } from '../utils/index'
import { isEmptyObject } from '../utils/util'

const aMap = {
  REQUEST_TEACHER_INFO: createAction(REQUEST_TEACHER_INFO, datas => datas),
  RECEIVE_TEACHER_INFO: createAction(RECEIVE_TEACHER_INFO, datas => datas),
  RECEIVE_NO_TEACHER_INFO: createAction(RECEIVE_NO_TEACHER_INFO, datas => datas),
  REQUEST_ADD_TEACHER: createAction(REQUEST_ADD_TEACHER, datas => datas),  
  RECEIVE_ADD_TEACHER: createAction(RECEIVE_ADD_TEACHER, datas => datas)
}

export function fetchTeacherData () {
  return async (dispatch, getState) => {
    dispatch(aMap[REQUEST_TEACHER_INFO]())
    let res
    if (process.env.TARO_ENV === 'weapp') {
      const _openid = await getOpenId()
      res = await Taro.cloud.callFunction({
        name: 'teacher',
        data: {
          func: 'getTeacher',
          data: {
            _openid: _openid
          }
        }
      }).catch(err => {
        console.log(err)
        dispatch(aMap[RECEIVE_TEACHER_INFO](getState().teacher))
      })
    }
    Taro.hideLoading()
    const teacherData = res.result.data
    if (isEmptyObject(teacherData)) {
      dispatch(aMap[RECEIVE_NO_TEACHER_INFO]())
    } else {
      dispatch(aMap[RECEIVE_TEACHER_INFO](teacherData))
    }
  }
}

export function addTeacherData (email, university, name) {
  return async (dispatch, getState) => {
    Taro.showLoading({ title: '加载中...' })
    dispatch(aMap[REQUEST_ADD_TEACHER]())
    let res
    if (process.env.TARO_ENV === 'weapp') {
      const _openid = await getOpenId()
      res = await Taro.cloud.callFunction({
        name: 'teacher',
        data: {
          func: 'addTeacher',
          data: {
            _openid: _openid,
            name: name,
            email: email,
            university: university
          }
        }
      }).catch(err => {
        console.log(err)
        dispatch(aMap[RECEIVE_ADD_TEACHER](getState().teacher))
      })
    }
    Taro.hideLoading()
    const teacherData = res.result.data
    dispatch(aMap[RECEIVE_ADD_TEACHER](teacherData))
  }
}
