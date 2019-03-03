import { em } from 'csx'
import * as React from 'react'
import { connect } from 'react-redux'
import { Value } from 'slate'
import { Editor as SlateEditor } from 'slate-react'
import { style } from 'typestyle'
import Decorator from './Decorator'

interface State {
  value: Value
  isSelected: boolean
}

class Editor extends React.Component<null, State> {
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
    isSelected: false,
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
            marginTop: 10,
            marginBottom: 0,
            fontSize: 21,
            lineHeight: 1.58,
            letterSpacing: em(-0.003),
          })}
        >
          <SlateEditor value={this.state.value} onChange={this.onChange} />
        </div>
        <Decorator isSelected={this.state.isSelected} />
      </div>
    )
  }

  private onChange = ({ value }: { value: Value }) => {
    this.setState({
      value,
      isSelected:
        value.selection.anchor.offset !== value.selection.focus.offset,
    })
  }
}

export default connect(
  (state: any) => ({}),
  dispatch => ({}),
)(Editor)
