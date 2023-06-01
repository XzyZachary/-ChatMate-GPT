import { APP_CHAT_USER_MESSAGE } from './types'

export const setChattUserMessage = (message?: string) => ({
  type: APP_CHAT_USER_MESSAGE,
  payload: message
})
