import { AppState } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { SheetProvider } from 'react-native-actions-sheet'
import {
  DefaultTheme,
  NavigationContainer,
  NavigationContainerRefWithCurrent
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ROUTES, RootStackParamList } from './routes'
import NavigationService from './NavigationService'
import { SNStatusBar } from '@src/screens/components'
import * as Screens from '@src/screens'
import { defaultScreenOptions as _defaultScreenOptions } from './ScreenHelper'
import { Theme, useTheme } from '@src/theme'

const defaultScreenOptions = (theme: Theme) => {
  return _defaultScreenOptions(theme, {})
}
const StackNavigator = createStackNavigator<RootStackParamList>()
export const AppNavigationContainer = () => {
  const appState = useRef(AppState.currentState)
  const { theme } = useTheme()

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
