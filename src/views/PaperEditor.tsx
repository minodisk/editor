import { em, percent, rgba } from 'csx'
import * as React from 'react'
import { connect } from 'react-redux'
import { style } from 'typestyle'
import { AppState } from '../modules'
import { clearLink, ClearLinkAction } from '../modules/link'
import Decorator from './Decorator'
import Editor from './Editor/Editor'

interface StateProps {
  link: string
}

interface DispatchProps {
  clearLink: () => ClearLinkAction
}

interface Props extends StateProps, DispatchProps {}

interface State {
  selectedRange?: Range
}

class PaperEditor extends React.Component<Props, State> {
  public state = {
    selectedRange: undefined,
  }

  public render() {
    return (
      <div
        className={style({
          width: percent(100),
          height: percent(100),
          position: 'relative',
        })}
      >
        <Editor
          className={style({
            boxSizing: 'border-box',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: percent(100),
            maxWidth: 740,
            height: percent(100),
            paddingLeft: 20,
            paddingRight: 20,
            fontFamily:
              "'Noto Serif JP', Georgia, Cambria, 'Times New Roman', Times, serif",
            fontSize: 21,
            lineHeight: 1.58,
            letterSpacing: em(-0.003),
            color: rgba(0, 0, 0, 0.84).toString(),
            $nest: {
              p: {
                marginTop: 29,
                marginBottom: 0,
                '&:first-child': {
                  marginTop: 0,
                },
              },
              a: {
                color: 'inherit',
              },
            },
          })}
          onSelect={this.onSelect}
          onUnselect={this.onUnselect}
        />
        <Decorator
          selectedRange={this.state.selectedRange}
          onLink={this.onLink}
        />
      </div>
    )
  }

  private onSelect = (selection: Selection) => {
    console.log('onSelect:', selection)
    this.setState({
      selectedRange: selection.getRangeAt(0),
    })
  }

  private onUnselect = () => {
    console.log('onUnselect')
    this.setState({
      selectedRange: undefined,
    })
  }

  private onLink = (url: string) => {
    console.log('onLink:', url, this.state.selectedRange)
  }

  // private onCancel = () => {
  //   this.setState({
  //     selectedRange: undefined,
  //   })
  // }

  // private onChange = ({ value }: { value: Value }) => {
  //   this.setState({
  //     value,
  //     selection:
  //       value.selection.anchor.offset === value.selection.focus.offset
  //         ? null
  //         : value.selection,
  //   })
  // }

  // private onKeyDown = (event: Event, editor: SlateEditor, next: () => any) => {
  //   const e: KeyboardEvent = event as KeyboardEvent
  //   if (e.key !== 'Enter') {
  //     return next()
  //   }
  //   if (!e.shiftKey) {
  //     return next()
  //   }
  //   return editor.insertText('\n')
  // }
  //
  // private renderNode = (
  //   props: RenderNodeProps,
  //   editor: SlateEditor,
  //   next: () => any,
  // ) => {
  //   switch (props.root.type) {
  //     case 'paragraph': {
  //       return <p {...props.attributes}>{props.children}</p>
  //     }
  //     default: {
  //       return next()
  //     }
  //   }
  // }
  //
  // private renderMark = (
  //   props: RenderMarkProps,
  //   editor: SlateEditor,
  //   next: () => any,
  // ) => {
  //   switch (props.mark.type) {
  //     case 'bold': {
  //       return <strong {...props.attributes}>{props.children}</strong>
  //     }
  //     case 'link': {
  //       return (
  //         <a href={props.mark.data.get('href')} {...props.attributes}>
  //           {props.children}
  //         </a>
  //       )
  //     }
  //     default: {
  //       return next()
  //     }
  //   }
  // }
}

export default connect(
  ({ link }: AppState) => ({ link }),
  dispatch => ({
    clearLink: () => dispatch(clearLink()),
  }),
)(PaperEditor)
