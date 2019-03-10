import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { reducer } from './modules'
import PaperEditor from './views/PaperEditor'

export const create = (el: HTMLElement) => {
  const store = createStore(reducer, applyMiddleware(createLogger()))
  ReactDOM.render(
    <Provider store={store}>
      <PaperEditor />
    </Provider>,
    el,
  )
}
