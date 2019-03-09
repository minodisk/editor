import { combineReducers } from 'redux'
import link from './link'

export interface AppState {
  link: string
}

export const reducer = combineReducers<AppState>({
  link,
})
