import { Dispatch } from 'redux'
import { RootState } from '@src/store'
import { logError } from '@src/helper/logger'
import { APP_INIT, APP_INIT_ERROR } from './types'
import DeviceInfo from 'react-native-device-info'

export const initApp = () => {
  return async (dispatch: Dispatch, _getState: () => RootState) => {
    try {
      dispatch({
        type: APP_INIT,
        payload: {
          name: await DeviceInfo.getApplicationName(),
          deviceInfo: {
            brand: await DeviceInfo.getBrand(),
            bundleId: await DeviceInfo.getBundleId()
          }
        }
      })
    } catch (error: any) {
      logError(error)
      dispatch({
        type: APP_INIT_ERROR,
        payload: { errorMessage: error.message }
      })
    }
  }
}
