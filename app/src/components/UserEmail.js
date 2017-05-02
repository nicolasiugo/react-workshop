import React from 'react'
import PropTypes from 'prop-types'


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
        <input
          onChange={this.handleChange} 
          type="email"/>
        <input
          type="submit"
          value="Enviar"/>
      </form>
    )
  }
}

UserEmail.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default UserEmail;
