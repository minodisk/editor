import { em, percent, rgba } from 'csx'
import * as React from 'react'
import { connect } from 'react-redux'
import { style } from 'typestyle'
import { AppState } from '../modules'
import { clearLink, ClearLinkAction } from '../modules/link'
// import Decorator from './Decorator'
import Editor from './Editor/Editor'

interface StateProps {
  link: string
}

interface DispatchProps {
  clearLink: () => ClearLinkAction
}

interface Props extends StateProps, DispatchProps {}

// interface State {
//   value: Value
//   selection: Selection | null
// }

class PaperEditor extends React.Component<Props, {}> {
  // public state: State = {
  //   value: Value.fromJSON({
  //     document: {
  //       nodes: [
  //         {
  //           object: 'block',
  //           type: 'paragraph',
  //           nodes: [
  //             {
  //               object: 'text',
  //               leaves: [
  //                 {
  //                   object: 'leaf',
  //                   text: 'A line of text in a paragraph.',
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   }),
  //   selection: null,
  // }

  // public componentWillReceiveProps(
  //   nextProps: Readonly<Props>,
  //   nextContext: any,
  // ): void {
  //   if (
  //     nextProps.link &&
  //     this.state.selection != null &&
  //     this.state.selection.anchor.path != null
  //   ) {
  //     this.setState({
  //       value: this.state.value.addMark(
  //         this.state.selection.anchor.path,
  //         this.state.selection.anchor.offset,
  //         this.state.selection.focus.offset -
  //           this.state.selection.anchor.offset,
  //         Mark.create({ type: 'link', data: { href: nextProps.link } }),
  //       ),
  //       selection: null,
  //     })
  //     this.props.clearLink()
  //   }
  // }

  public render() {
    return (
      <div
        className={style({
          width: percent(100),
          height: percent(100),
          position: 'relative',
        })}
      >
        <div
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
        >
          <Editor />
        </div>
        {/*<Decorator isSelected={this.state.selection != null} />*/}
      </div>
    )
  }

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
  //   switch (props.node.type) {
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
