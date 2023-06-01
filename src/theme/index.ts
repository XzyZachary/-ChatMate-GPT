import ThemeContext, { useTheme } from './ThemeContext'
import ThemeProvider from './ThemeProvider'
import themes, { ThemeType, lightThemes, darkThemes } from './themes'
export { ThemeContext, ThemeProvider, themes, useTheme }

export type { ThemeType }
export * from './types'
export * as SylCommon from './common'
export { lightThemes as lightThems, darkThemes as darkThems }
