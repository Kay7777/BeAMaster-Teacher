import { combineReducers } from 'redux'
import teacher from './teacher'
import course from './course'

export default combineReducers({
    teacher,
    course
})