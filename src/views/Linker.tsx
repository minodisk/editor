import TextField from '@material-ui/core/TextField'
import * as React from 'react'

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
      <form onSubmit={this.onSubmit}>
        <TextField
          autoFocus
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
