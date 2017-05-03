import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'


class UserEmail extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      value: ''
    };
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.state.value)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          id="user-email"
          value={this.state.value}
          onChange={this.handleChange} 
          type="email"/>
        <Divider />
        <RaisedButton
          type="submit"
          label="Enviar"/>
      </form>
    )
  }
}

UserEmail.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default UserEmail;
