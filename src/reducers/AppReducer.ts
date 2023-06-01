import { ABOUT_US } from '@src/config'
import {
  APP_INIT,
  APP_LATEST_VERSION,
  Action,
  APP_INIT_ERROR,
  IState
} from '../types'

const INITIAL_STATE: IState.AppState = {
  aboutUs: ABOUT_US,
  version: {
    version: '1.0.0'
  }
}

export default (
  state: IState.AppState = INITIAL_STATE,
  action: Action
): IState.AppState => {
  switch (action.type) {
    case APP_INIT:
      return { ...state, ...action.payload }
    case APP_LATEST_VERSION:
      return { ...state, latestVersion: action.payload }
    case APP_INIT_ERROR:
      return { ...state, errorMessage: action.payload }
    default:
      return state
  }
}
