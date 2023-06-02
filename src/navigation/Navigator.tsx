import { AppState, Platform } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { SheetProvider } from 'react-native-actions-sheet'
import {
  DefaultTheme,
  NavigationContainer,
  NavigationContainerRefWithCurrent
} from '@react-navigation/native'
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
import { RootState } from '@src/store'
import { SNStatusBar } from '@src/screens/components'
import * as Screens from '@src/screens'
import OpenAIApi from '@src/api'
import { ApiServersInitData } from '@src/config'
import { defaultScreenOptions as _defaultScreenOptions } from './ScreenHelper'
import { Theme, useTheme } from '@src/theme'

const defaultScreenOptions = (theme: Theme) => {
  return _defaultScreenOptions(theme, {})
}
const StackNavigator = createStackNavigator<RootStackParamList>()
export const AppNavigationContainer = () => {
  const appState = useRef(AppState.currentState)
  const { openAISetting } = useAppSelector(
    (state: RootState) => state
  )
  const { theme } = useTheme()
  const dispatch = useAppDispatch()
  useEffect(() => {
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
                title: ROUTES.Setting,
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
