import {
  APP_CACHE_UPDATE_CONVERSATIONS,
  APP_CACHE_FEATURE_TIP_HISTORY,
  FeatureTipType,
  ChatConversation
} from '../types'
import { Dispatch } from 'redux'
import { RootState } from '@src/store'
import { uuidv4 } from '@src/utils/uuid'
import { newChatConversation } from '@src/helper/chatHelper'
import { setCurrentConversation } from './ChatActions'
import { conversationListToMap } from '@src/helper/conversation'

export const updateConversations =
  (
    conversations: Array<ChatConversation>,
    checkCurrentChat = false
  ) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const _state = getState()
    if (
      checkCurrentChat &&
      conversations
        .map((v) => v.id)
        .includes(_state.chat.chat?.id || 'none')
    ) {
      dispatch(
        setCurrentConversation(
          conversations.find((v) => v.id === _state.chat.chat!.id),
          false
        ) as any
      )
    }
    const newChatConversationMap = {
      ..._state.cache.conversations,
      ...conversationListToMap(conversations)
    }
    dispatch({
      type: APP_CACHE_UPDATE_CONVERSATIONS,
      payload: newChatConversationMap
    })
  }

export const updateFatureTipHistory = (feature: FeatureTipType) => ({
  type: APP_CACHE_FEATURE_TIP_HISTORY,
  payload: feature
})

export const initConversations =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    const _state = getState()
    if (
      _state.cache.conversations &&
      Object.keys(_state.cache.conversations).length > 0
    ) {
      return
    }
    const _id_prefix = uuidv4() as string
    const conversations: ChatConversation[] = [
      newChatConversation({
        id: _id_prefix + '0'
      }),
      {
        ...newChatConversation({
          id: _id_prefix + '1',
          title: 'chat.chatCasually',
          prompt: ''
        }),
        perference: {
          maxMessagesInContext: 3
        }
      }
    ]
    dispatch(updateConversations(conversations) as any)
  }
