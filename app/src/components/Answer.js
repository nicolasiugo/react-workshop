import React from 'react'
import PropTypes from 'prop-types';


const Answer = (props) => {
  const {
    answerId,
    onAnswerSelected,
    answerContent
  } = props;

  return (
    <div>
      <input 
        id={`answer-input-${answerId}`}
        value={answerId}
        defaultChecked={false}
        type="radio"
        onChange={onAnswerSelected}/>
      <label htmlFor={`answer-input-${answerId}`}>
        {answerContent}
      </label>
    </div>
  );
}

Answer.propTypes = {
  answerId: PropTypes.number.isRequired,
  answerContent: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
}

export default Answer;