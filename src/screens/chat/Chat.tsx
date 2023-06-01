import { useAppSelector } from '@src/hooks'
import {
  ROUTES,
  ChatScreenProps as ScreenProps
} from '@src/navigation/routes'
import { View } from 'react-native'
import { RootState } from '@src/store'
import { useTheme } from '@src/theme'
import { connect } from 'react-redux'

const Chat = ({
  route,
  navigation,
  setting
}: ScreenProps & {
  setting: RootState['setting']
  app: RootState['app']
  openAISetting: RootState['openAISetting']
}) => {
  const { theme } = useTheme()
  const { chatId = undefined } = route.params || {}

  //   const {
  //     chat: { chat: currentConversation }
  //   } = useAppSelector((state: RootState) => state)

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <View
      style={{
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        paddingBottom: theme.spacing.extraLarge * 1.5
      }}>
      21312321
    </View>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    setting: state.setting,
    app: state.app,
    openAISetting: state.openAISetting
  }
}

export default connect(mapStateToProps)(Chat)
