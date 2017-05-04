import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'


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
      <div style={{marginTop:'30px'}}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="user-email"
            hintText="Ingresar email"
            value={this.state.value}
            onChange={this.handleChange} 
            type="email"/>
          <RaisedButton
            style={{marginLeft:'30px'}}
            primary
            type="submit"
            label="Enviar"/>
        </form>
      </div>
    )
  }
}

UserEmail.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default UserEmail;
