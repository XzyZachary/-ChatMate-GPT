import { useFocusEffect } from '@react-navigation/native'
import { useTheme } from '@src/theme'
import { useCallback } from 'react'
import { Platform, StatusBar } from 'react-native'

export const SNSStatusBar = ({
  backgroundColor
}: {
  backgroundColor?: string
}) => {
  const { theme } = useTheme()
  useFocusEffect(
    useCallback(() => {
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(
          backgroundColor ?? theme.colors.headerBackground
        )
      }
      StatusBar.setBarStyle(theme.statusBarStyle)
      return () => null
    }, [backgroundColor, theme])
  )
  return null
}

export default SNSStatusBar
