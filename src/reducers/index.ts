import { combineReducers } from 'redux'
import AppReducer from './AppReducer'

const reducers = combineReducers({
  app: AppReducer
})

export default reducers
