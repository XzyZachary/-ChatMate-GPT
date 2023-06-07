import { SvgRadioButton } from '@src/svg'
import { useTheme } from '@src/theme'
import React, { useMemo, useState } from 'react'

export const RadioOption = (checked: boolean) => {
  const { theme } = useTheme()
  return !checked ? (
    <SvgRadioButton.normal
      width={15}
      height={15}
      color={checked ? theme.colors.primary : theme.colors.disabled}
    />
  ) : (
    <SvgRadioButton.selected
      width={15}
      height={15}
      color={checked ? theme.colors.primary : theme.colors.disabled}
    />
  )
}
