import React, { Component } from 'react'
import logo from './logo.svg'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Client from './Client'
import Question from './components/Question/Question'
import UserEmail from './components/UserEmail/UserEmail'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props);
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this)
    this.handleSubmitEmail    = this.handleSubmitEmail.bind(this)

    this.state = {
      loading: true,
      question: null,
      answers: [],
      error: false,
      saving: false,
      userEmail: null,
      answerId: null
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    Promise.all([
      Client.get('questions/1'), 
      Client.get('questions/1/answers')
    ]).then(res => {
      this.setState({
        question: res[0],
        answers: res[1],
        loading: false
      })
    }).catch(err => {
      this.setState({
        error: err,
        loading: false
      })
    })
  }

  postAnswer() {
    console.log(this.state)
    Client
      .post(`questions/1/answers/${this.state.answerId}/response`, {user_email: this.state.userEmail})
      .then(res => {
        this.setState({saving: false})
      })
      .catch(err => {
        this.setState({
          error: err,
          saving: false
        })
      })
  }

  handleAnswerSelected(answerId) {
    this.setState({
      saving: true,
      answerId
    }, () => {
      this.postAnswer()
    })
  }

  handleSubmitEmail(userEmail) {
    this.setState({
      userEmail
    })
  }

  render() {

    if (this.state.loading) {
      return (
        <div>Cargando...</div>
      );
    }

    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>
    }

    if (this.state.answerId && this.state.userEmail) {
      return <div>Gracias!</div>
    }

    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>
              SmartTalent Quiz
            </h2>
          </div>

          <div>
            {!this.state.userEmail 
              ? <UserEmail onSubmit={this.handleSubmitEmail}/>
              : <Question
                  question={this.state.question}
                  onAnswerSelected={this.handleAnswerSelected}
                  answers={this.state.answers} />}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
