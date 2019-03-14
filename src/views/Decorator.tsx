import IconButton from '@material-ui/core/IconButton'
import InsertLink from '@material-ui/icons/InsertLink'
import { percent, translate } from 'csx'
import * as React from 'react'
import { style } from 'typestyle'
import Linker from './Linker'

interface Props {
  selectedRange?: Range
  onLink?: (url: string) => void
}

interface State {
  mode: Mode
  position?: Position
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
    mode: Mode.None,
    position: undefined,
  }

  public componentWillReceiveProps(
    nextProps: Readonly<Props>,
    nextContext: any,
  ): void {
    this.setState({
      position: nextProps.selectedRange
        ? (() => {
            if (
              nextProps.selectedRange.startOffset ===
              nextProps.selectedRange.endOffset
            ) {
              return undefined
            }
            const rect = nextProps.selectedRange.getBoundingClientRect()
            return {
              left: ((rect.left + rect.right) / 2) >> 0,
              top: rect.bottom,
            }
          })()
        : undefined,
    })
  }

  public render() {
    const { position } = this.state
    if (!position) {
      return null
    }

    return (
      <div
        className={style({
          transform: translate(percent(-50)),
          position: 'absolute',
          ...(position || {}),
        })}
      >
        {this.state.mode === Mode.None ? (
          <IconButton onClick={this.onClickLink}>
            <InsertLink />
          </IconButton>
        ) : this.state.mode === Mode.Link ? (
          <Linker onLink={this.onLink} onCancel={this.onCancel} />
        ) : null}
      </div>
    )
  }

  private onClickLink = () => this.setState({ mode: Mode.Link })

  private onLink = (url: string) => {
    this.setState({ mode: Mode.None, position: undefined })
    if (this.props.onLink) {
      this.props.onLink(url)
    }
  }

  private onCancel = () => {
    this.setState({ mode: Mode.None, position: undefined })
  }
}
