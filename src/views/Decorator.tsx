import { percent, translate } from 'csx'
import * as React from 'react'
import { style } from 'typestyle'
import Linker from './Linker'

interface Props {
  selectedRect?: ClientRect
}

interface State {
  isTextSelected: boolean
  position: Position
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
    isTextSelected: false,
    position: { left: 0, top: 0 },
    mode: Mode.None,
  }

  public componentWillReceiveProps(
    nextProps: Readonly<Props>,
    nextContext: any,
  ): void {
    if (nextProps.selectedRect === undefined) {
      this.setState({ isTextSelected: false })
    } else {
      this.setState({
        isTextSelected: true,
        position: {
          left:
            ((nextProps.selectedRect.left + nextProps.selectedRect.right) /
              2) >>
            0,
          top: nextProps.selectedRect.bottom,
        },
      })
    }
  }

  public render() {
    if (!this.state.isTextSelected && this.state.mode === Mode.None) {
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
