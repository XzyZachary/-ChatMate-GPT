/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-16.
 */

import {
  initConversations,
  initCurrentConversation,
  setICloudSyncTime,
  updateApiKey,
  updateApiServer
} from '@src/actions'
import {
  APP_STORE_URL,
  GOOGLE_PLAY_URL,
  ICLOUD_CHAT_DATA_PATH,
  ICloudConfig
} from '@src/config'
import {
  conversationMapToList,
  logInfo,
  useQuickAction
} from '@src/helper'
import {
  getOpenAIModels,
  verifyOpenAIAPIServer
} from '@src/helper/openai'
import { useAppDispatch, useAppSelector } from '@src/hooks'
import { translate } from '@src/i18n'
import { useTheme } from '@src/theme'
import { Callbacks, ICloudChatMateData } from '@src/types'
import { alert } from '@src/utils/alert'
import DocumentPicker from 'react-native-document-picker'

import { useCallback } from 'react'
// eslint-disable-next-line react-native/split-platform-components
import { Platform, Share } from 'react-native'
import RNFS from 'react-native-fs'

export const useSettingAction = () => {
  const dispatch = useAppDispatch()
  const { theme } = useTheme()
  const {
    showActionButtons,
    checkApiKeyRule,
    checkApiServerRule,
    showMsg,
    tips
  } = useQuickAction()
  const { openAISetting, setting, cache, chatSetting } =
    useAppSelector((state) => state)
  const shareApp = async () => {
    try {
      const result = await Share.share({
        message: translate('brand.name'),
        url: Platform.OS !== 'ios' ? GOOGLE_PLAY_URL : APP_STORE_URL
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error: any) {
      showMsg({
        type: 'error',
        text2: `${translate('errors.error')}`
      })
    }
  }

  const verifyApiServer = useCallback(
    async (
      apiServer?: string,
      messageType: 'toast' | 'alert' = 'toast'
    ) => {
      if (checkApiServerRule(apiServer, messageType)) {
        try {
          await verifyOpenAIAPIServer(apiServer!)
        } catch (_error: any) {
          if (messageType === 'toast') {
            showMsg({
              type: 'error',
              text2: translate('setting.apiserver.verifyFail'),
              visibilityTime: 2000,
              onPress: () => {
                showMsg({
                  type: 'error',
                  text2: _error.message,
                  visibilityTime: 5000,
                  autoHide: true
                })
              }
            })
          } else {
            alert({
              title: translate('errors.error'),
              message: translate('setting.apiserver.verifyFail')
            })
          }
          return false
        }
        return true
      }
      return false
    },
    [setting.languageTag]
  )

  const setOpenAIApiServer = useCallback(
    async (
      apiServer?: string,
      messageType: 'toast' | 'alert' = 'toast'
    ) => {
      if (!(await verifyApiServer(apiServer, messageType)))
        return false
      dispatch(updateApiServer(apiServer!) as any)
      if (messageType === 'toast') {
        showMsg({
          type: 'success',
          text2: translate('setting.apiserver.saveSuccess')
        })
      } else {
        alert({
          title: translate('common.success'),
          message: translate('setting.apiserver.saveSuccess')
        })
      }
      return true
    },
    [setting.languageTag]
  )

  const effectOnRestartTips = useCallback(() => {
    showMsg({
      text2: translate('tips.effectOnRestart')
    })
  }, [setting.languageTag])
  const setOpenAIApiKey = useCallback(
    async (
      apiKey?: string,
      options?: {
        messageType?: 'toast' | 'alert'
        validate?: boolean
      }
    ) => {
      const { messageType = 'toast', validate = true } = options || {}
      if (validate) {
        console.log(999, checkApiKeyRule(apiKey))
        if (checkApiKeyRule(apiKey)) {
          try {
            await getOpenAIModels(apiKey!, openAISetting.apiServer)
          } catch (_error: any) {
            tips(_error.message, {
              mtype: messageType
            })
            return false
          }
        } else {
          tips(translate('setting.apikey.verifyFail'), {
            type: 'error',
            mtype: messageType
          })
          return false
        }
      }

      dispatch(updateApiKey(apiKey!) as any)

      tips(translate('setting.apikey.saveSuccess'), {
        mtype: messageType
      })

      return true
    },
    [setting.languageTag, openAISetting]
  )

  const resetConversations = useCallback(() => {
    const confirmOK = () => {
      //   dispatch(clearConversations() as any)
      //   dispatch(initConversations() as any)
      //   dispatch(initCurrentConversation() as any)
      showMsg({
        type: 'success',
        text2: `${translate('confirm.clearConversationsAndInit')}`
      })
    }

    showActionButtons({
      title: translate('common.confirm'),
      description: translate('confirm.clearConversations'),
      buttons: [
        {
          text: translate('common.cancel'),
          style: 'cancel'
        },
        {
          text: translate('common.ok'),
          style: 'destructive',
          onPress: confirmOK
        }
      ],
      cancelButtonIndex: 0,
      destructiveButtonIndex: 1
    })
  }, [setting.languageTag, theme])

  const pickDirectory = async (params?: Callbacks) => {
    try {
      const _path = await DocumentPicker.pickDirectory({
        presentationStyle: 'pageSheet',
        transitionStyle: 'coverVertical'
      })
      if (_path === null) return Promise.reject('path is null')

      return {
        ..._path,
        uri: decodeURIComponent(_path.uri)
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return {
    checkApiKeyRule,
    effectOnRestartTips,
    setOpenAIApiKey,
    verifyApiServer,
    checkApiServerRule,
    setOpenAIApiServer,
    shareApp,
    resetConversations
  }
}
