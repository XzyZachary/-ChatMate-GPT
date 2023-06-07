import { ChatConversation } from '@src/types'
import { SheetManager } from 'react-native-actions-sheet'
import { Platform, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { ChatContextMenu2 } from './ChatContextMenu2'

export const ChatCMenu = (props: {
  showTitle?: boolean
  children: React.ReactNode
  conversation: ChatConversation
}) => {
  return Platform.OS === 'ios' ? (
    <ChatContextMenu2 {...props} />
  ) : null
}

// export const showChatMenuOptions = (props: {
//   conversation: ChatConversation
// }) => {
//   SheetManager.show('node-sheet', {
//     onClose: () => {},
//     payload: {
//       title: props.conversation.title,
//       children: <ChatMenuOptions conversation={props.conversation} />
//     }
//   })
// }
