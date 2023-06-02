import { NavigationService, ROUTES } from '@src/navigation'
import { RootState } from '@src/store'
import { useAppDispatch, useAppSelector } from '@src/hooks'
import DeviceInfo from 'react-native-device-info'
import { FeatureTipType } from '@src/types'
import { updateFatureTipHistory } from '@src/actions'
import { alert } from '@src/utils/alert'
import {
  // eslint-disable-next-line react-native/split-platform-components
  ActionSheetIOS,
  Alert,
  AlertType,
  Dimensions,
  Platform,
  Share,
  ShareContent
} from 'react-native'
import {
  copyToClipboard,
  getFromClipboard
} from '@src/utils/clipboard'
import { useToast } from '@src/components'

const TestOpenAIApiKeyRule = /^[a-zA-Z0-9-]{42,60}$/ // 42-60位字母数字横杠
const TestOpenAIApiServer = /^https?:\/\//i

export const useQuickAction = () => {
  const {
    cache: { featureTipsHistory },
    app,
    setting,
    openAISetting
  } = useAppSelector((state: RootState) => state)

  const { showMessage, hideMessage } = useToast()

  const dispatch = useAppDispatch()
  const checkIsSetAPIKey = (
    redirectSettingScreen?: boolean,
    hideCallback?: () => void
  ) => {
    const _redirectSettingScreen = () => {
      redirectSettingScreen &&
        NavigationService.navigate(`${ROUTES.ApiKeyConfig}`)
    }
    if (!openAISetting.apiKey || openAISetting.apiKey === '') {
      return false
    }
    return true
  }

  const copyText = (text: string, tips?: string) => {
    copyToClipboard(text)
    showMessage({
      type: 'success',
      text2: '复制成功'
    })
  }

  const share = async ({ ...rest }: ShareContent) => {
    try {
      const result = await Share.share({
        ...rest
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error: any) {
      showMessage({
        type: 'error',
        text2: 'errors.error'
      })
    }
  }

  const model = DeviceInfo.getModel()
  const isIOS = Platform.OS === 'ios'
  const isIphone = isIOS && model.includes('iPhone')
  const isIPad = isIOS && model.includes('iPad')
  const isAndroid = Platform.OS === 'android'
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height
  const isBigScreen = isIPad || screenWidth >= 700

  const deviceModelInfo = {
    isIOS,
    isAndroid,
    isIPad,
    isIphone,
    isBigScreen,
    screenHeight,
    screenWidth,
    model
  }

  /**
   * 功能提示
   * @param feature
   * @returns
   */
  const featureTips = (
    feature: FeatureTipType,
    options?: {
      visibilityTime?: number
      type?: 'toast' | 'alert'
    }
  ) => {
    const { type = 'toast', visibilityTime = 3500 } = options || {}
    if (
      featureTipsHistory &&
      featureTipsHistory[feature] !== undefined &&
      featureTipsHistory[feature]! > 0
    )
      return

    if (type === 'toast') {
    } else {
      alert({
        message: `tips.feature.${feature}`
      })
    }
    dispatch(updateFatureTipHistory(feature))
  }

  return {
    checkIsSetAPIKey,
    copyText,
    share,

    featureTips,
    deviceModelInfo
  }
}
