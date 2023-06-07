import { AppState, Platform } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { SheetProvider } from 'react-native-actions-sheet'
import {
  DefaultTheme,
  NavigationContainer,
  NavigationContainerRefWithCurrent
} from '@react-navigation/native'
import SplashScreen from 'react-native-splash-screen'
import { getSettingApiServer } from '@src/helper'
import {
  initConversations,
  initCurrentConversation,
  updateApiServers
} from '@src/actions'
import { wait } from '@src/utils/utils'
import { useAppDispatch, useAppSelector } from '@src/hooks'
import { createStackNavigator } from '@react-navigation/stack'
import { ROUTES, RootStackParamList } from './routes'
import NavigationService from './NavigationService'
import { RootState, store } from '@src/store'
import { SNStatusBar } from '@src/screens/components'
import * as Screens from '@src/screens'
import OpenAIApi from '@src/api'
import { ApiServersInitData } from '@src/config'
import {
  LanguageTagType,
  changeLocale,
  getLocale,
  translate
} from '@src/i18n'
import { defaultScreenOptions as _defaultScreenOptions } from './ScreenHelper'
import { Theme, useTheme } from '@src/theme'
import { changeDayJsLocale } from '@src/utils/date'

const defaultScreenOptions = (theme: Theme) => {
  return _defaultScreenOptions(theme, {})
}
const StackNavigator = createStackNavigator<RootStackParamList>()
const resetLocales = (locale: LanguageTagType) => {
  changeLocale(locale)
  changeDayJsLocale(getLocale())
}
export const AppNavigationContainer = () => {
  const appState = useRef(AppState.currentState)
  const {
    setting: { languageTag, pasteFromClipboard, icloudSync },
    openAISetting
  } = useAppSelector((state: RootState) => state)
  const { theme } = useTheme()
  const dispatch = useAppDispatch()
  useEffect(() => {
    // 设置语言
    resetLocales(store.getState().setting.languageTag)
    // 延迟300毫秒隐藏启动屏幕，防止白屏
    wait(300, () => {
      SplashScreen.hide()
    })
    const initData = async () => {
      dispatch(initConversations() as any)
      dispatch(initCurrentConversation() as any)
    }
    // 初始化设置 API Key 和 API 服务器
    if (
      !openAISetting.apiServers ||
      openAISetting.apiServers.length === 0
    ) {
      dispatch(updateApiServers(ApiServersInitData) as any)
    }

    // 优先使用用户设置的API Key
    if (openAISetting.apiKey) {
      OpenAIApi.setApiKey(openAISetting.apiKey)
    }
    // 设置API服务器
    if (openAISetting.apiServers) {
      OpenAIApi.setApiBasePath(
        getSettingApiServer(openAISetting.apiServers)
      )
    }
    // 设置网络超时
    if (openAISetting.networkTimeout) {
      OpenAIApi.setTimeout(openAISetting.networkTimeout)
    }
    wait(700, initData)
  }, [])
  useEffect(() => {
    resetLocales(languageTag)
  }, [languageTag])
  return (
    <SafeAreaProvider
      style={{ backgroundColor: theme.colors.background }}>
      <SheetProvider>
        <NavigationContainer
          ref={(
            navigatorRef: NavigationContainerRefWithCurrent<RootStackParamList>
          ) => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
          theme={{
            dark: theme.name === 'dark',
            colors: {
              ...DefaultTheme.colors,
              background: theme.colors.background
            }
          }}
          documentTitle={{
            formatter: (options, route) =>
              `${options?.title ?? route?.name}`
          }}>
          <SNStatusBar />
          <StackNavigator.Navigator>
            <StackNavigator.Screen
              name={ROUTES.ChatDrawer}
              component={Screens.ChatDrawer}
              options={({ route, navigation }) => ({
                ...defaultScreenOptions(theme),
                headerBackground: undefined,
                headerShown: false
              })}
            />
            <StackNavigator.Screen
              name={ROUTES.Setting}
              component={Screens.Setting}
              options={({ route, navigation }) => ({
                title: translate(`router.${ROUTES.Setting}`),
                ...defaultScreenOptions(theme),
                headerShown: true
              })}
            />
          </StackNavigator.Navigator>
        </NavigationContainer>
      </SheetProvider>
    </SafeAreaProvider>
  )
}
