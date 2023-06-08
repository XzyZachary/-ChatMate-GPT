import { ChatConversation } from '@src/types'
import { SheetManager } from 'react-native-actions-sheet'
import {
  Platform,
  StyleProp,
  TouchableOpacity,
  ViewStyle
} from 'react-native'
import React from 'react'
import { ChatContextMenu2 } from './ChatContextMenu2'
import { IMessage } from 'react-native-gifted-chat'
export * from './MessageContextMenu2'
import { ChatMessageOptions } from '../setting'
import { MessageContextMenu2 } from './MessageContextMenu2'

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

export const MessageCMenu = (props: {
  message: IMessage
  conversation: ChatConversation
  containerStyle?: StyleProp<ViewStyle>
  children: React.ReactNode
}) => {
  return Platform.OS === 'ios' ? (
    <MessageContextMenu2 {...props} />
  ) : (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        showMessageMenuOptions({
          conversation: props.conversation,
          message: props.message
        })
      }}>
      {props.children}
    </TouchableOpacity>
  )
}

export const showMessageMenuOptions = (props: {
  message: IMessage
  conversation: ChatConversation
}) => {
  SheetManager.show('node-sheet', {
    onClose: () => {},
    payload: {
      title: props.conversation.title,
      children: (
        <ChatMessageOptions
          conversation={props.conversation}
          message={props.message}
        />
      )
    }
  })
}
