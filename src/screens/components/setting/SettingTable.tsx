import {
  setOpenLinkInApp,
  setPasteFromClipboard,
  updateApiServers
} from '@src/actions'
import { Avatar, Text } from '@src/components'
import { ABOUT_US } from '@src/config'
import {
  CHANGELOG_LINK,
  FAQ_LINK,
  HELP_CUSTOM_API_SERVER_LINK,
  PRIVACY_POLICY_LINK
} from '@src/config/constants'
import { useAppDispatch, useAppSelector } from '@src/hooks'
import { translate } from '@src/i18n'
import { NavigationService, ROUTES } from '@src/navigation'
import { RootState } from '@src/store'
import { LoadingModal } from '@src/components'
import { useTheme } from '@src/theme'
import { ApiServerInfo } from '@src/types'
import { getUrlHost } from '@src/utils'
import { fromNow } from '@src/utils/date'
import { open, sendEmail } from '@src/utils/urls'
import { truncateString, wait } from '@src/utils/utils'
import { uuidv4 } from '@src/utils/uuid'
import React, { useCallback, useMemo } from 'react'
import { Platform, TouchableOpacity, View } from 'react-native'
import { SheetManager } from 'react-native-actions-sheet'
import { ShowInputSubmitSheet } from '../action-sheet'
import { RadioOption, Svgs } from '../common'
import Icons, { Ions, iconSetting } from '../common/Icons'
import { TableList } from '../list'
import { OpenAISettingGroup } from './SettingOpenAI'
import { LanguageGroupSettingOptions } from './SettingOptions'

export const Settings = () => {
  const { theme } = useTheme()
  return (
    <View
      style={{
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        paddingBottom: theme.spacing.extraLarge * 1.5
      }}>
      <OpenAISettingGroup />
      <GeneralSettingGroupSetting />
    </View>
  )
}

export const GeneralSettingGroupSetting = () => {
  const { theme } = useTheme()
  const { setting, cache } = useAppSelector((state) => state)
  const [doing, setDoing] = React.useState(false)

  return (
    <>
      <LoadingModal overlay={false} visible={doing} />
      <TableList
        title={translate('setting.info.universal')}
        rows={[
          {
            leftNode: <Svgs.settings.ChatBox theme={theme} />,
            title: translate('setting.info.chat'),
            withArrow: true,
            onPress: () =>
              NavigationService.navigate(ROUTES.SettingChat)
          },
          {
            leftNode: <Svgs.settings.Language theme={theme} />,
            title: translate('setting.language.language'),
            rightText: translate('locale.' + setting.languageTag),
            arrowDirection: 'down',
            withArrow: true,
            onPress: () => {
              console.log(SheetManager.show)
              SheetManager.show('node-sheet', {
                onClose: (data: any) => {},
                payload: {
                  title: translate('action.languageSetting'),
                  description: translate(
                    'action.languageSettingDescription'
                  ),
                  children: <LanguageGroupSettingOptions />
                }
              })
            }
          }
        ]}
      />
    </>
  )
}
