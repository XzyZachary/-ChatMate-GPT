import { useTheme } from '@src/theme'
import {
  setLocales,
  setTheme,
  setThemeLightMode,
  setThemeNightMode
} from '@src/actions'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@src/hooks'
import {
  LanguageTagType,
  translate,
  translationTitle
} from '@src/i18n'
import { RadioOption } from '../common'
import { restartApp } from '@src/utils/devices'
import { TableList } from '../list'
import { IMessage } from 'react-native-gifted-chat'
import { ChatConversation } from '@src/types'
import { SheetManager } from 'react-native-actions-sheet'
import { useChatMessageAction } from '@src/hooks/useChatMessageAction'

export const LanguageGroupSettingOptions = () => {
  const { theme } = useTheme()
  const appDispatch = useAppDispatch()
  const _language = useAppSelector(
    (state) => state.setting.languageTag
  )
  const setting = useAppSelector((state) => state.setting)
  return (
    <TableList
      containerStyle={{
        marginVertical: theme.spacing.small
      }}
      rows={Object.keys(translationTitle).map(
        (language_name: string) => {
          return {
            title: translate(`locale.${language_name}`),
            rightNode: RadioOption(language_name === _language),
            onPress: () => {
              SheetManager.hide('node-sheet')
              setLocales(language_name as LanguageTagType)(
                appDispatch
              )
              setTimeout(restartApp, 500)
            }
          }
        }
      )}
    />
  )
}

export const ChatMessageOptions = ({
  conversation,
  message
}: {
  message: IMessage
  conversation: ChatConversation
}) => {
  const { theme } = useTheme()
  const { chatMessageMenuPress } = useChatMessageAction(
    message,
    conversation
  )
  return (
    <TableList
      containerStyle={{ marginVertical: theme.spacing.small }}
      rows={[
        {
          title: translate('common.copy'),
          press: () => {
            chatMessageMenuPress({
              action: 'copy'
            })
          }
        },
        {
          title: translate('common.share'),
          press: () => {
            chatMessageMenuPress({
              action: 'share'
            })
          }
        }
      ].map((item, _idx) => {
        return {
          ...item,
          withArrow: true,
          onPress: () => {
            SheetManager.hide('node-sheet')
            item.press && item.press()
          }
        }
      })}
    />
  )
}
