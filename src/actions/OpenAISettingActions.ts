import { ApiServerInfo, APP_API_SERVERS_UPDATE } from '../types'
import { Dispatch } from 'redux'
import { RootState } from '@src/store'
import OpenAIApi from '@src/api'
import { getSettingApiServer } from '@src/helper'

export const updateApiServers =
  (updateServers: ApiServerInfo[]) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const {
      openAISetting: { apiServers }
    } = getState()
    updateServers.forEach((item: ApiServerInfo) => {
      const index = apiServers.findIndex(
        (server) => server.id === item.id
      )
      if (index > -1) {
        apiServers[index] = item
      } else {
        apiServers.push(item)
      }
    })

    const _usingServer = apiServers.find(
      (_server: ApiServerInfo) => _server.use
    )
    if (!_usingServer) {
      apiServers[0].use = true
    }

    OpenAIApi.setApiBasePath(getSettingApiServer(apiServers))

    dispatch(setApiServers(apiServers))
  }

export const setApiServers = (apiServers: ApiServerInfo[]) => ({
  type: APP_API_SERVERS_UPDATE,
  payload: apiServers
})
