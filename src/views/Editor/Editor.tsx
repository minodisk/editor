import * as React from 'react'
import ContentEditable from 'react-contenteditable'
import Ast from './Ast'

interface State {
  html: string
}

export default class Editor extends React.Component<{}, State> {
  public ast = new Ast('<p><br /></p>')
  public state = {
    html: this.ast.toHtml(),
  }

  // public ref = React.createRef()

  public render() {
    return (
      <div onMouseUp={this.onMouseUp}>
        <ContentEditable
          html={this.state.html}
          // ref={this.ref}
          onChange={this.onChange}
          // onKeyDown={this.onKeyDown}
        />
      </div>
    )
  }

  private onChange = (e: React.FormEvent<HTMLDivElement>) => {
    console.log('onChange:', e.currentTarget.innerHTML)
    this.update(e.currentTarget.innerHTML)
    // this.update(e.currentTarget.innerHTML)
  }

  // private onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
  //   console.log('onKeyDown:', window.getSelection().getRangeAt(0))
  // }
  //
  private onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('onMouseUp:')
    console.log(window.getSelection())
    console.log(window.getSelection().getRangeAt(0))
  }

  private update = (html: string) => {
    this.ast.update(html)
    console.log('---------------------------')
    console.log(html)
    console.log('===')
    console.log(this.ast.toHtml())
    this.setState({
      html: this.ast.toHtml(),
    })
  }
}
