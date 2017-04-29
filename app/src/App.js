import React, { Component } from 'react';
import logo from './logo.svg';
import Client from './Client';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      question: null,
      answers: []
    }
  }

  componentDidMount() {
    Client
      .get('questions/1')
      .then(question => {
        this.setState({
          question
        })
      });


    Client
      .get('questions/1/answers')
      .then(answers =>{
        this.setState({
          answers
        })
      })
  }

  render() {

    if (!this.state.question) {
      return (
        <div>Cargando...</div>
      );
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
              <li key={`answer-${answer.id}`}>
                {answer.text}
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default App;
