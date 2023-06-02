import { ChatConversation, ChatMessage } from '@src/types'
export type ConversationOrderByType = 'updateTime' | 'createTime'
export type ConversationMap = {
  [key: string]: ChatConversation
}

export const sortConversations = (
  conversations: Array<ChatConversation>,
  orderBy: ConversationOrderByType = 'updateTime'
) => {
  return conversations.sort((a, b) => {
    const _orderBy =
      orderBy === 'updateTime' ? 'updateAt' : 'createAt'
    const aTime = a[_orderBy] || a.createAt
    const bTime = b[_orderBy] || b.createAt
    return bTime - aTime
  })
}

export const conversationListToMap = (
  conversations: Array<ChatConversation>,
  listSortBy?: ConversationOrderByType
): ConversationMap => {
  return (
    listSortBy
      ? sortConversations(conversations, listSortBy)
      : conversations
  ).reduce((acc, conversation) => {
    return {
      ...acc,
      [conversation.id]: conversation
    }
  }, {})
}

export const conversationMapToList = (
  conversations: ConversationMap
): Array<ChatConversation> => {
  return Object.keys(conversations).map((id) => conversations[id])
}

export const sortConversationMap = (
  conversations: {
    [key: string]: ChatConversation
  },
  mapSortBy: ConversationOrderByType = 'updateTime'
): ConversationMap => {
  return conversationListToMap(
    conversationMapToList(conversations),
    mapSortBy
  )
}

export const filterConversationMap = (
  conversations: {
    [key: string]: ChatConversation
  },
  filter: (conversation: ChatConversation) => boolean
): ConversationMap => {
  return conversationListToMap(
    conversationMapToList(conversations).filter(filter)
  )
}
