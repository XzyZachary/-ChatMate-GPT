/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-23.
 */

import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerNavigationOptions,
  createDrawerNavigator,
  useDrawerStatus
} from '@react-navigation/drawer'
import { DrawerActions } from '@react-navigation/native'
import { useQuickAction } from '@src/helper'
import { translate } from '@src/i18n'
import { defaultScreenOptions as _defaultScreenOptions } from '@src/navigation'
import {
  ROUTES,
  ChatDrawerScreenProps as ScreenProps
} from '@src/navigation/routes'
import { RootState } from '@src/store'
import { SylCommon, useTheme } from '@src/theme'
import { Theme } from '@src/types'
import { HeaderButton, Svgs } from '../components'
import { ChatCMenu } from '../components/context-menu'
import React, { useEffect } from 'react'
import { Keyboard, View, Text, Alert } from 'react-native'
import { connect } from 'react-redux'
import ChatScreen from './Chat'
import { SettingSideBar } from '../components/sidebar'
import { SettingSideBarContainerStyle } from '../components/sidebar/SettingSideBar'

const defaultScreenOptions = (theme: Theme) => {
  return _defaultScreenOptions(theme, {
    headerBackground: () => (
      <View style={SylCommon.Header.background(theme)} />
    )
  })
}
const drawerContentWidth = 220
/**
 * Crate Drawer Navigator
 */
const ChatDrawerNavigator = createDrawerNavigator()
const ChatDrawerContent = (props: DrawerContentComponentProps) => {
  const isDrawerOpen = useDrawerStatus() === 'open'

  useEffect(() => {
    if (isDrawerOpen) {
      Keyboard.dismiss()
    }
  }, [isDrawerOpen])
  return (
    <DrawerContentScrollView scrollEnabled={false} {...props}>
      <SettingSideBar wrapperWidth={drawerContentWidth} />
    </DrawerContentScrollView>
  )
}
const ChatDrawer = ({
  navigation,
  chat,
  initialRouteName
}: ScreenProps & {
  initialRouteName: string
  setting: RootState['setting']
  chat: RootState['chat']
}) => {
  const { theme } = useTheme()
  return (
    <ChatDrawerNavigator.Navigator
      initialRouteName={initialRouteName}
      drawerContent={(props) => <ChatDrawerContent {...props} />}
      screenOptions={{
        headerLeft: () => (
          <HeaderButton
            onPress={() => {
              if (chat.requesting) {
                return
              }
              navigation.dispatch(DrawerActions.toggleDrawer())
            }}
            iconNode={<Svgs.headers.Chats theme={theme} />}
            direction="left"
          />
        ),
        headerRight: () =>
          chat.chat ? (
            <ChatCMenu conversation={chat.chat} showTitle={false}>
              <HeaderButton
                iconNode={<Svgs.headers.More theme={theme} />}
              />
            </ChatCMenu>
          ) : null,
        drawerType: 'slide',
        drawerStyle: SettingSideBarContainerStyle(
          theme,
          drawerContentWidth
        )
      }}>
      <ChatDrawerNavigator.Screen
        key={ROUTES.Chat}
        name={ROUTES.Chat}
        component={ChatScreen}
        options={{
          ...(defaultScreenOptions(theme) as DrawerNavigationOptions),
          headerShown: true,
          title: translate(`router.${ROUTES.Chat}`)
        }}
      />
    </ChatDrawerNavigator.Navigator>
  )
}
const mapStateToProps = (state: RootState) => {
  return { setting: state.setting, chat: state.chat }
}
export default connect(mapStateToProps)(ChatDrawer)
