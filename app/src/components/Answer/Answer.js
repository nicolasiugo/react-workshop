import React from 'react'
import PropTypes from 'prop-types'


const Answer = (props) => {
  const {
    answerId,
    onAnswerSelected,
    answerContent,
    isChecked
  } = props;

  return (
    <div>
      <input 
        id={`answer-input-${answerId}`}
        value={answerId}
        checked={isChecked}
        type="radio"
        onChange={onAnswerSelected}/>
      <label htmlFor={`answer-input-${answerId}`}>
        {answerContent}
      </label>
    </div>
  );
}

Answer.defaultProps = {
  isChecked: false
}

Answer.propTypes = {
  answerId: PropTypes.number.isRequired,
  isChecked: PropTypes.bool,
  answerContent: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
}

export default Answer;