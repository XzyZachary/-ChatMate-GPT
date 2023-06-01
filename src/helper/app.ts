import { Store } from 'redux'
import { initApp } from '../actions'

export const onAppStart = async (store: Store) => {
  store.dispatch(initApp() as any)
}
