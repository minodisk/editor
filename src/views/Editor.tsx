import { em } from 'csx'
import * as React from 'react'
import { connect } from 'react-redux'
import { Editor as SlateEditor, Mark, Selection, Value } from 'slate'
import { Editor as SlateReactEditor, RenderMarkProps } from 'slate-react'
import { style } from 'typestyle'
import { AppState } from '../modules'
import { clearLink, ClearLinkAction } from '../modules/link'
import Decorator from './Decorator'

interface StateProps {
  link: string
}

interface DispatchProps {
  clearLink: () => ClearLinkAction
}

interface Props extends StateProps, DispatchProps {}

interface State {
  value: Value
  selection: Selection | null
}

class Editor extends React.Component<Props, State> {
  public state: State = {
    value: Value.fromJSON({
      document: {
        nodes: [
          {
            object: 'block',
            type: 'paragraph',
            nodes: [
              {
                object: 'text',
                leaves: [
                  {
                    object: 'leaf',
                    text: 'A line of text in a paragraph.',
                  },
                ],
              },
            ],
          },
        ],
      },
    }),
    selection: null,
  }

  public componentWillReceiveProps(
    nextProps: Readonly<Props>,
    nextContext: any,
  ): void {
    if (
      nextProps.link &&
      this.state.selection != null &&
      this.state.selection.anchor.path != null
    ) {
      this.setState({
        value: this.state.value.addMark(
          this.state.selection.anchor.path,
          this.state.selection.anchor.offset,
          this.state.selection.focus.offset -
            this.state.selection.anchor.offset,
          Mark.create({ type: 'link', data: { href: nextProps.link } }),
        ),
        selection: null,
      })
      this.props.clearLink()
    }
  }

  public render() {
    return (
      <div
        className={style({
          width: '100%',
          height: '100%',
          position: 'relative',
        })}
      >
        <div
          className={style({
            width: '100%',
            height: '100%',
            fontFamily:
              "'Noto Serif JP', Georgia, Cambria, 'Times New Roman', Times, serif",
            fontSize: 21,
            lineHeight: 1.58,
            letterSpacing: em(-0.003),
            $nest: {
              p: {
                marginTop: 10,
                marginBottom: 0,
              },
            },
          })}
        >
          <SlateReactEditor
            value={this.state.value}
            onChange={this.onChange}
            renderMark={this.renderMark}
          />
        </div>
        <Decorator isSelected={this.state.selection != null} />
      </div>
    )
  }

  private renderMark = (
    props: RenderMarkProps,
    editor: SlateEditor,
    next: () => any,
  ) => {
    switch (props.mark.type) {
      case 'bold': {
        return <strong {...props.attributes}>{props.children}</strong>
      }
      case 'link': {
        return (
          <a href={props.mark.data.get('href')} {...props.attributes}>
            {props.children}
          </a>
        )
      }
      default: {
        next()
        return
      }
    }
  }

  private onChange = ({ value }: { value: Value }) => {
    this.setState({
      value,
      selection:
        value.selection.anchor.offset === value.selection.focus.offset
          ? null
          : value.selection,
    })
  }
}

export default connect(
  ({ link }: AppState) => ({ link }),
  dispatch => ({
    clearLink: () => dispatch(clearLink()),
  }),
)(Editor)
