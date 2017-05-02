import React, { Component } from 'react';
import logo from './logo.svg';
import Client from './Client';
import Answer from './components/Answer';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this)
    
    this.state = {
      loading: true,
      question: null,
      answers: [],
      error: false,
      saving: false
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

  handleAnswerSelected(evt) {
    this.setState({saving: true})

    Client
      .post(`answers/${evt.target.value}/response`, {user_email: 'lal@example.com'})
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

  render() {

    if (this.state.loading) {
      return (
        <div>Cargando...</div>
      );
    }

    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>
    }


    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>
            {this.state.question.description}
          </h2>
        </div>
        
        <ul className="App-intro">
          {this.state.answers.map(answer => {
            return (
              <Answer 
                key={answer.id}
                answerId={answer.id}
                answerContent={answer.text}
                onAnswerSelected={this.handleAnswerSelected}/>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default App;
