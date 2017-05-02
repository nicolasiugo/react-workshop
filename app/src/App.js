import React, { Component } from 'react';
import logo from './logo.svg';
import Client from './Client';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      question: null,
      answers: [],
      error: false
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
      console.log(err)
      this.setState({
        error: err,
        loading: false
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
