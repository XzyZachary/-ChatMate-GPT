import { AppDispatch, RootState } from '@src/store'
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector
} from 'react-redux'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector

export * from '@src/hooks/useGPTChat'

export * from '@src/hooks/useSettingAction'
