import { handleActions } from 'redux-actions'
import {
  REQUEST_TEACHER_INFO,
  RECEIVE_TEACHER_INFO,
  RECEIVE_NO_TEACHER_INFO,
  REQUEST_ADD_TEACHER,
  RECEIVE_ADD_TEACHER
} from '../constants/teacher'

const teacherData = {
  isFetching: false,
  isLogged: false,
  isUploading: false
}

export default handleActions({
  [REQUEST_TEACHER_INFO] (state) {
    return {
      ...state,
      isFetching: true
    }
  },
  [RECEIVE_TEACHER_INFO] (state, action) {
    const { email, university } = action.payload
    return {
      ...state,
      email,
      university,
      isFetching: false,
      isLogged: true
    }
  },
  [RECEIVE_NO_TEACHER_INFO] (state) {
    return {
      ...state,
      isFetching: false
    }
  },
  [REQUEST_ADD_TEACHER] (state) {
    return {
      ...state,
      isUploading: true
    }
  },
  [RECEIVE_ADD_TEACHER] (state, action) {
    const { email, university } = action.payload
    return {
      ...state,
      email,
      university,
      isLogged: true,      
      isUploading: false
    }
  }
}, {...teacherData})
