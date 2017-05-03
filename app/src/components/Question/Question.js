import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'

import Answer from '../Answer/Answer'

class Question extends React.Component {

  constructor(props){
    super(props)
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      selectedAnswerId: undefined
    }
  }

  handleAnswerSelected(event) {
    this.setState({
      selectedAnswerId: event.target.value
    })
  }

  handleSubmit() {
    if (this.state.selectedAnswerId !== undefined) {
      this.props.onAnswerSelected(this.state.selectedAnswerId)
    } else {
      alert("Debes seleccionar una opcion");
    }
  }

  render() {
    return (
      <div>
        <ul className="App-intro">
          {this.props.answers.map(answer => {
            return (
              <Answer 
                key={answer.id}
                isChecked={parseInt(this.state.selectedAnswerId, 10) === answer.id}
                answerId={answer.id}
                answerContent={answer.text}
                onAnswerSelected={this.handleAnswerSelected}/>
            )
          })}
        </ul>
        <RaisedButton
          onClick={this.handleSubmit}
          label="Enviar respuesta!"/>
      </div>
    );
  }
}

Question.propTypes = {
  answers: PropTypes.array,
  onAnswerSelected: PropTypes.func.isRequired
}

export default Question;
