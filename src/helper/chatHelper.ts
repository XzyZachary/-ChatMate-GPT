import {
  ChatConversation,
  ChatMessage,
  ApiServerInfo
} from '@src/types'
import {
  OpenAIAPITokenCost,
  calcOpenAIApiTokenCost,
  OpenAIConst
} from './openai'
import { uuidv4 } from '@src/utils/uuid'
import { getTimestampSecond } from '@src/utils/utils'
import {
  ResourcePromptInfo,
  ResourcePromptTag,
  ResourcePromptTagColors,
  ResourcePromptTagTypes
} from './resourcePrompts'
import { translate } from '@src/i18n'
export type CHAT_ACTION_MENU_TYPE =
  | 'rename'
  | 'model'
  | 'temperature'
  | 'prompt'
  | 'messages'
  | 'copy'
  | 'share'
  | 'delete'
  | 'new'
  | 'stat'
  | 'shortcut'
export type CHAT_MESSAGE_ACTION_MENU_TYPE =
  | 'copy'
  | 'share'
  | 'none'
  | 'speech'

export const newChatConversation = (props?: {
  id?: string
  title?: string
  prompt?: string
  createAt?: number
}): ChatConversation => {
  return {
    id: 'cm-' + (props?.id ? props?.id : (uuidv4() as string)),
    title: props?.title ?? translate('chat.newChat'),
    prompt: props?.prompt ?? translate('chat.prompt.default'),
    createAt: props?.createAt ?? getTimestampSecond()
  }
}

export const getSettingApiServer = (servers?: ApiServerInfo[]) => {
  if (!servers || !servers.length) return OpenAIConst.API_SERVERS[0]
  const matchs = servers.find((server) => server.use)
  return matchs ? matchs.serverHost : servers[0].serverHost
}

export const chatStat = (conversation: ChatConversation) => {
  const gptMessages =
    conversation &&
    conversation.messages &&
    conversation.messages.length > 0
      ? conversation.messages.filter(
          (message: ChatMessage) =>
            message.message.role === 'assistant'
        )
      : []

  if (gptMessages.length === 0) return undefined

  let cost =
    gptMessages
      .filter((message: ChatMessage) => message.usage)
      .map((message: ChatMessage) =>
        calcOpenAIApiTokenCost(message.usage, message.model!)
      )
      .filter((_cost?: OpenAIAPITokenCost) => _cost !== undefined)
      .map((_v) => _v?.total)
      .reduce((_a, _b) => _a! + _b!) || 0
  cost = Math.round(cost * 100000) / 100000

  return {
    tokens: gptMessages
      .filter((message: ChatMessage) => message.usage)
      .map((message: ChatMessage) => message.usage?.total_tokens)
      .reduce((_a, _b) => _a! + _b!),
    cost,
    gptMessages: gptMessages.length
  }
}

export interface PromptShortcutInfo {
  id: number
  title: string
  prompt: string
  tags: ResourcePromptTag[]
  description?: string
  website?: string
  weight: number
}
