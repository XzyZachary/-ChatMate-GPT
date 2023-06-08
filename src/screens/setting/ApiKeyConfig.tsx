import {
  ROUTES,
  ApiKeyConfigScreenProps as ScreenProps
} from '@src/navigation/routes'
import { HELP_GET_API_KEY_LINK } from '@src/config/constants'
import { useSettingAction } from '@src/hooks'
import { RootState } from '@src/store'
import { SylCommon, useTheme } from '@src/theme'
import React, { useLayoutEffect } from 'react'
import { useQuickAction } from '@src/helper'
import { translate } from '@src/i18n'
import { View } from 'react-native'
import { HeaderButton, InputText2Submit } from '../components'
import { LoadingModal } from '@src/components'
import { connect } from 'react-redux'
import { NavigationService } from '@src/navigation'

const ApiKeyConfig = ({
  navigation,
  openAISetting
}: ScreenProps & {
  openAISetting: RootState['openAISetting']
  setting: RootState['setting']
}) => {
  const { theme } = useTheme()
  const { setOpenAIApiKey } = useSettingAction()
  const { showAccountCostUsageTips, openUrl } = useQuickAction()
  const [inputKey, setInputKey] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerRight:
        inputKey && inputKey.length > 0
          ? () => (
              <HeaderButton
                direction="right"
                text={translate('common.cost')}
                onPress={() => {
                  setLoading(true)
                  showAccountCostUsageTips({
                    apiKey: inputKey,
                    finallyFn: () => {
                      setLoading(false)
                    }
                  })
                }}
              />
            )
          : undefined
    })
  }, [navigation, inputKey])

  return (
    <View
      style={
        (SylCommon.Layout.fill, SylCommon.Card.container(theme))
      }>
      <LoadingModal overlay={false} visible={loading} />
      <InputText2Submit
        title={translate('setting.apikey.title')}
        tipsText={translate('setting.apikey.tips')}
        tipsPressCallback={() => openUrl(HELP_GET_API_KEY_LINK)}
        inputInitialValue={openAISetting.apiKey}
        description={translate('setting.apikey.description')}
        inputPlaceholder={translate('setting.apikey.placeholder')}
        textInputProps={{
          inputMode: 'text',
          numberOfLines: 1,
          autoFocus: true
        }}
        inputTextChange={(_key?: string) => {
          setInputKey(_key ?? '')
        }}
        textInputType="password"
        buttonTitle={translate('setting.apikey.verifyAndSave')}
        submit={async (key?: string) => {
          if (await setOpenAIApiKey(key)) {
            NavigationService.goBack()
          }
        }}
        longPressSubmit={async (key?: string) => {
          if (
            await setOpenAIApiKey(key, {
              validate: false
            })
          ) {
            NavigationService.goBack()
          }
        }}
      />
    </View>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    openAISetting: state.openAISetting,
    setting: state.setting
  }
}

export default connect(mapStateToProps)(ApiKeyConfig)
