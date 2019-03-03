import { Action } from 'redux'

export const CREATE_LINK = 'CREATE_LINK'

export const createLink = (): Action => {
  return {
    type: CREATE_LINK,
  }
}

export default function link(state: boolean = false, action: Action) {
  switch (action.type) {
    case CREATE_LINK:
      return true
    default:
      return state
  }
}
