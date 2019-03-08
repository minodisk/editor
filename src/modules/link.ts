import { Action } from 'redux'

enum ActionTypes {
  CREATE_LINK = 'CREATE_LINK',
  CLEAR_LINK = 'CLEAR_LINK',
}

interface CreateLinkAction extends Action {
  type: ActionTypes.CREATE_LINK
  payload: {
    url: string
  }
}

export interface ClearLinkAction extends Action {
  type: ActionTypes.CLEAR_LINK
}

export const createLink = (url: string): CreateLinkAction => {
  return {
    type: ActionTypes.CREATE_LINK,
    payload: { url },
  }
}

export const clearLink = (): ClearLinkAction => {
  return {
    type: ActionTypes.CLEAR_LINK,
  }
}

export default function link(
  state: string = '',
  action: CreateLinkAction | ClearLinkAction,
) {
  switch (action.type) {
    case ActionTypes.CREATE_LINK:
      return action.payload.url
    case ActionTypes.CLEAR_LINK:
      return ''
    default:
      return state
  }
}
