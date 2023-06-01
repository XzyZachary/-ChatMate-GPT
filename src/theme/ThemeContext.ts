import React, { useContext } from 'react'
import { Theme } from './types'
import themes, { ThemeType } from './themes'

export interface ThemeContextProps {
  theme: Theme
  themeName: ThemeType
  resetTheme: (theme: ThemeType) => void
}

const ThemeContext = React.createContext<ThemeContextProps>({
  theme: themes.grey,
  themeName: 'grey',
  resetTheme: (themesName: string) => {}
})

export default ThemeContext
export const useTheme = () => useContext(ThemeContext)
