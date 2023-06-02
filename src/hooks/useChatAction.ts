import { ChatConversation, ChatMessage } from '@src/types'

import { useAppDispatch, useAppSelector } from '@src/hooks'
import { useToast } from '@src/components'
import { useTheme } from '@src/theme'

export const useChatActionMenu = (conversation: ChatConversation) => {
  const dispatch = useAppDispatch()
  const { showMessage } = useToast()
  const { theme } = useTheme()
  //   const {} = useQuickAction()
}
