import * as React from 'react'
import { connect } from 'react-redux'
import { createLink } from '../modules/link'

interface DispatchProps {
  createLink: () => void
}

class Linker extends React.Component<DispatchProps> {
  public render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" autoFocus />
      </form>
    )
  }

  private onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.createLink()
  }
}

export default connect(
  (state: any) => ({}),
  dispatch => ({
    createLink: () => dispatch(createLink()),
  }),
)(Linker)
