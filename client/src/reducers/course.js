import { handleActions } from 'redux-actions'
import {
  REQUEST_ADD_COURSE,
  RECEIVE_ADD_COURSE,
  REQUEST_TEACHER_COURSES_INFO,
  RECEIVE_TEACHER_COURSES_INFO,
  REQUEST_DELETE_COURSE,
  RECEIVE_DELETE_COURSE
} from '../constants/course'

import { arrayToObject } from '../utils/util'

const courseData = {
  isUploading: false,
  isFetching: false,
  isDeleting: false,
  teacherCourses: {}
}

export default handleActions({
  [REQUEST_ADD_COURSE] (state) {
    return {
      ...state,
      isUploading: true
    }
  },
  [RECEIVE_ADD_COURSE] (state) {
    return {
      ...state,
      isUploading: false,
    }
  },
  [REQUEST_DELETE_COURSE] (state) {
    return {
      ...state,
      isDeleting: true
    }
  },
  [RECEIVE_DELETE_COURSE] (state) {
    return {
      ...state,
      isDeleting: false,
    }
  },
  [REQUEST_TEACHER_COURSES_INFO] (state) {
    return {
      ...state,
      isFetching: true,
    }
  },
  [RECEIVE_TEACHER_COURSES_INFO] (state, action) {
    const teacherCourses = arrayToObject(action.payload, '_id')
    return {
      ...state,
      isFetching: false,
      teacherCourses: teacherCourses
    }
  }
}, {...courseData})