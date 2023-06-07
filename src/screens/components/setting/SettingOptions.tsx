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
import { SheetManager } from 'react-native-actions-sheet'

export const LanguageGroupSettingOptions = () => {
  const { theme } = useTheme()
  const appDispatch = useAppDispatch()
  const _language = useAppSelector(
    (state) => state.setting.languageTag
  )
  console.log(12312312321)
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
