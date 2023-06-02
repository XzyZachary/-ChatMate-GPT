import { HeaderTitleProps } from '@react-navigation/elements'
import { Theme, useTheme } from '@src/theme'
import type { ReactNode } from 'react'
import React from 'react'
import {
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle
} from 'react-native'
export interface CustomHeaderTitleProps extends HeaderTitleProps {
  containerStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  descriptionStyle?: StyleProp<TextStyle>
  descriptionText?: string | ReactNode
}

export const CustomHeaderTitle = (props: CustomHeaderTitleProps) => {
  const { theme } = useTheme()
  const renderDescription = () => {
    if (!props.descriptionText) return null
    if (typeof props.descriptionText === 'string') {
      return (
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={[
            styles.CustomHeaderTitle.description(theme),
            props.descriptionStyle
          ]}>
          {props.descriptionText}
        </Text>
      )
    }
    return props.descriptionText
  }
  return (
    <View
      style={[
        styles.CustomHeaderTitle.container(theme),
        props.containerStyle
      ]}>
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        style={[
          styles.CustomHeaderTitle.title(theme),
          props.titleStyle
        ]}>
        {props.children}
      </Text>
      {renderDescription()}
    </View>
  )
}

const styles = {
  CustomHeader: (
    theme: Theme
  ): {
    container: ViewStyle
  } => {
    return {
      container: {
        height: 44,
        backgroundColor: theme.colors.headerBackground,
        paddingHorizontal: theme.spacing.small,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    }
  },
  CustomHeaderTitle: {
    container: (theme: Theme): ViewStyle => ({
      minWidth: '50%',
      display: 'flex',
      flexDirection: 'column'
    }),
    title: (theme: Theme): TextStyle => ({
      width: '100%',
      alignSelf: 'center',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: theme.typography.titleText.fontSize,
      color: theme.colors.appbarTint
    }),
    description: (theme: Theme): TextStyle => ({
      ...theme.typography.captionText,
      width: '100%',
      textAlign: 'center',
      alignSelf: 'center',
      paddingVertical: theme.spacing.tiny
    })
  }
}
