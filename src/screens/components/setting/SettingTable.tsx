import { useAppSelector } from '@src/hooks'
import { View, Text } from 'react-native'
import { useTheme } from '@src/theme'

export const Settings = () => {
  const AppInfo = useAppSelector((state) => state.app)
  const { theme } = useTheme()
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <View
      style={{
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        paddingBottom: theme.spacing.extraLarge * 1.5
      }}>
      <Text>这是设置</Text>
    </View>
  )
}
