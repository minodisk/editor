import IconButton from '@material-ui/core/IconButton'
import FormatBold from '@material-ui/icons/FormatBold'
import InsertLink from '@material-ui/icons/InsertLink'
import Title from '@material-ui/icons/Title'
import {important, percent, px, rgb, translate} from 'csx'
import * as React from 'react'
import {style} from 'typestyle'
import {HeadlineLevel} from './Editor'
import Linker from './Linker'

interface Props {
  selectedRange?: Range
  onLink?: (url: string) => void
  onBold?: () => void
  onHeadline?: (level: HeadlineLevel) => void
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

const iconButtonClasses = {
  root: style({
    padding: important(px(10).toString()),
  }),
}
const iconClasses = {
  root: style({
    color: important(rgb(0xff, 0xff, 0xff).toHexString()),
  }),
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
          backgroundColor: rgb(0x26, 0x26, 0x25).toHexString(),
          ...(position || {}),
        })}
      >
        {this.state.mode === Mode.None ? (
          <React.Fragment>
            <IconButton classes={iconButtonClasses} onClick={this.onClickLink}>
              <InsertLink classes={iconClasses} />
            </IconButton>
            <IconButton classes={iconButtonClasses} onClick={this.onClickBold}>
              <FormatBold classes={iconClasses} />
            </IconButton>
            <IconButton
              classes={iconButtonClasses}
              onClick={() => this.onClickHeadline(HeadlineLevel.h1)}
            >
              <Title classes={iconClasses} />
            </IconButton>
            <IconButton
              classes={iconButtonClasses}
              onClick={() => this.onClickHeadline(HeadlineLevel.h2)}
            >
              <Title classes={iconClasses} />
            </IconButton>
          </React.Fragment>
        ) : this.state.mode === Mode.Link ? (
          <Linker onLink={this.onLink} onCancel={this.onCancel} />
        ) : null}
      </div>
    )
  }

  private onClickLink = () => this.setState({ mode: Mode.Link })

  private onClickBold = () => {
    if (this.props.onBold) {
      this.props.onBold()
    }
  }

  private onClickHeadline = (level: HeadlineLevel) => {
    if (this.props.onHeadline) {
      this.props.onHeadline(level)
    }
  }

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
