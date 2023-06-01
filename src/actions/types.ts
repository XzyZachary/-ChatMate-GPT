export const APP_CHAT_USER_MESSAGE = 'chatmate_user_message'
export const APP_INIT = 'chatmate_init'
export const APP_INIT_ERROR = 'chatmate_init_error'
export const APP_LATEST_VERSION = 'chatmate_latest_version'

export const ActionTypes = {
  APP_CHAT_USER_MESSAGE,
  APP_INIT,
  APP_INIT_ERROR,
  APP_LATEST_VERSION
}
export type ActionTypes = typeof ActionTypes[keyof typeof ActionTypes]
export interface Action {
  type: ActionTypes
  payload: any
}
