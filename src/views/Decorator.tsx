import { percent, translate } from 'csx'
import * as React from 'react'
import { style } from 'typestyle'
import Linker from './Linker'

interface Props {
  isSelected: boolean
}

interface State {
  position: Position | null
  mode: Mode
}

interface Position {
  left: number
  top: number
}

enum Mode {
  None,
  Link,
}

export default class Decorator extends React.Component<Props, State> {
  public state = {
    position: { left: 0, top: 0 },
    mode: Mode.None,
  }

  public componentWillReceiveProps(
    nextProps: Readonly<Props>,
    nextContext: any,
  ): void {
    this.setState({
      position: nextProps.isSelected
        ? (() => {
            const selection = document.getSelection()
            if (selection === null) {
              return null
            }
            const range = selection.getRangeAt(0)
            if (range.startOffset === range.endOffset) {
              return null
            }
            const rect = range.getBoundingClientRect()
            return {
              left: ((rect.left + rect.right) / 2) >> 0,
              top: rect.bottom,
            }
          })()
        : null,
    })
  }

  public render() {
    if (this.state.position == null) {
      return null
    }

    return (
      <div
        className={style({
          transform: translate(percent(-50)),
          position: 'absolute',
          ...this.state.position,
        })}
      >
        {this.state.mode === Mode.None ? (
          <React.Fragment>
            <button onClick={() => this.setState({ mode: Mode.Link })}>
              #
            </button>
          </React.Fragment>
        ) : this.state.mode === Mode.Link ? (
          <Linker />
        ) : null}
      </div>
    )
  }
}
