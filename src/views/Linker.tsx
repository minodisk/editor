import TextField from '@material-ui/core/TextField'
import * as React from 'react'
import { connect } from 'react-redux'
import { createLink } from '../modules/link'

interface DispatchProps {
  createLink: (url: string) => void
}

interface State {
  value: string
}

class Linker extends React.Component<DispatchProps, State> {
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
        />
      </form>
    )
  }

  private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value })
  }

  private onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.createLink(this.state.value)
  }
}

export default connect(
  (state: any) => ({}),
  dispatch => ({
    createLink: (url: string) => dispatch(createLink(url)),
  }),
)(Linker)
