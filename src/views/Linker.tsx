import TextField from '@material-ui/core/TextField'
import { px } from 'csx'
import * as React from 'react'
import { style } from 'typestyle'

interface Props {
  onLink: (url: string) => void
  onCancel: () => void
}

interface State {
  value: string
}

export default class Linker extends React.Component<Props, State> {
  public state = {
    value: '',
  }

  public render() {
    return (
      <form
        className={style({
          paddingLeft: px(6),
          paddingRight: px(6),
        })}
        onSubmit={this.onSubmit}
      >
        <TextField
          autoFocus
          placeholder="Paste or type a link..."
          value={this.state.value}
          onChange={this.onChange}
          onBlur={this.onBlur}
        />
      </form>
    )
  }

  private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value })
  }

  private onBlur = (e: React.FocusEvent) => {
    this.linkOrCancel()
  }

  private onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.linkOrCancel()
  }

  private linkOrCancel(): void {
    if (!this.state.value) {
      this.props.onCancel()
      return
    }
    this.props.onLink(this.state.value)
    this.setState({ value: '' })
  }
}
