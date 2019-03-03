import { em } from 'csx'
import * as React from 'react'
import { connect } from 'react-redux'
import { style } from 'typestyle'
import Decorator from './Decorator'

interface State {
  selectedRect?: ClientRect
}

class Editor extends React.Component<null, State> {
  public state: State = {}

  public componentWillMount() {
    document.addEventListener('selectionchange', this.onSelectionChanged)
  }

  public componentWillUnmount() {
    document.removeEventListener('selectionchange', this.onSelectionChanged)
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
          contentEditable
          suppressContentEditableWarning
          className={style({
            width: '100%',
            height: '100%',
            fontFamily:
              "'Noto Serif JP', Georgia, Cambria, 'Times New Roman', Times, serif",
            $nest: {
              p: {
                marginTop: 10,
                marginBottom: 0,
                fontSize: 21,
                lineHeight: 1.58,
                letterSpacing: em(-0.003),
              },
            },
          })}
        >
          <p>
            あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
          </p>
          <p>
            またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。
          </p>
          <p>
            では、わたくしはいつかの小さなみだしをつけながら、しずかにあの年のイーハトーヴォの五月から十月までを書きつけましょう。
          </p>
        </div>
        <Decorator selectedRect={this.state.selectedRect} />
      </div>
    )
  }

  private onSelectionChanged = (e: Event) => {
    const selection = document.getSelection()
    if (selection === null) {
      this.setState({
        selectedRect: undefined,
      })
      return
    }
    const range = selection.getRangeAt(0)
    if (range.startOffset === range.endOffset) {
      this.setState({
        selectedRect: undefined,
      })
      return
    }
    const selectedRect = range.getBoundingClientRect()
    this.setState({
      selectedRect,
    })
  }
}

export default connect(
  (state: any) => ({}),
  dispatch => ({}),
)(Editor)
