import Taro from '@tarojs/taro'
import { createAction } from 'redux-actions'

import {
  REQUEST_ADD_COURSE,
  RECEIVE_ADD_COURSE,
  REQUEST_TEACHER_COURSES_INFO,
  RECEIVE_TEACHER_COURSES_INFO
} from '../constants/course'

import { getOpenId } from '../utils/index'

const aMap = {
  REQUEST_ADD_COURSE: createAction(REQUEST_ADD_COURSE, datas => datas),
  RECEIVE_ADD_COURSE: createAction(RECEIVE_ADD_COURSE, datas => datas),
  REQUEST_TEACHER_COURSES_INFO: createAction(REQUEST_TEACHER_COURSES_INFO, datas => datas),
  RECEIVE_TEACHER_COURSES_INFO: createAction(RECEIVE_TEACHER_COURSES_INFO, datas => datas),  
}

export function addCourseData (data) {
  return async (dispatch, getState) => {
    const {
      courseName, 
      coursePrefix, 
      courseSuffix, 
      instructor, 
      courseDescription, 
      courseScale, 
      courseDuration, 
      courseDateSel, 
      courseTimeSel,
      courseLocation,
      courseState
    } = data
    Taro.showLoading({ title: '加载中...' })
    dispatch(aMap[REQUEST_ADD_COURSE]())
    let res
    if (process.env.TARO_ENV === 'weapp') {
      const _openid = await getOpenId()
      res = await Taro.cloud.callFunction({
        name: 'course',
        data: {
          func: 'addCourse',
          data: {
            _openid: _openid,
            courseName: courseName,
            coursePrefix: coursePrefix,
            courseSuffix: courseSuffix, 
            instructor: instructor, 
            courseDescription: courseDescription, 
            courseScale: courseScale,
            courseDuration: courseDuration, 
            courseDateSel: courseDateSel, 
            courseTimeSel: courseTimeSel, 
            courseLocation: courseLocation,
            courseState: courseState
          }
        }
      }).catch(err => {
        console.log(err)
        dispatch(aMap[RECEIVE_ADD_COURSE](getState().course))
      })
    }
    Taro.hideLoading()
    const courseData = res.result.data
    dispatch(aMap[RECEIVE_ADD_COURSE](courseData))
  }
}

export function getTeacherCoursesData () {
  return async (dispatch, getState) => {
    Taro.showLoading({ title: '加载中...' })
    dispatch(aMap[REQUEST_TEACHER_COURSES_INFO]())
    let res
    if (process.env.TARO_ENV === 'weapp') {
      const _openid = await getOpenId()
      res = await Taro.cloud.callFunction({
        name: 'course',
        data: {
          func: 'getTeacherCourses',
          data: {
            _openid: _openid
          }
        }
      }).catch(err => {
        console.log(err)
        dispatch(aMap[RECEIVE_TEACHER_COURSES_INFO](getState().course))
      })
    }
    Taro.hideLoading()
    const teacherCoursesData = res.result.data
    dispatch(aMap[RECEIVE_TEACHER_COURSES_INFO](teacherCoursesData))
  }  
}