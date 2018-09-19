import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as R from 'ramda';

import AskInput from '../components/AskInput';
import Question from '../components/Question';

import actions from '../redux/actions';

const Lists = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class Questions extends Component {
  sortQuestion(questions) {
    return R.pipe(
      R.sortWith([
        R.ascend(R.prop('done')),
        R.descend(R.prop('star')),
        R.descend(R.prop('like')),
        R.ascend(R.prop('timestamp')),
      ]),
    )(questions);
  }

  render() {
    const {
      questions,
      addQuestion,
      addLike,
      triggerStar,
      triggerDone,
    } = this.props;

    return (
      <div>
        <AskInput onAdd={addQuestion} />
        <Lists>
          {this.sortQuestion(questions).map((q, idx) => (
            <Question
              key={q.timestamp}
              {...q}
              addLike={() => addLike(q.timestamp)}
              triggerStar={() => triggerStar(q.timestamp)}
              triggerDone={() => triggerDone(q.timestamp)}
            />
          ))}
        </Lists>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.questions.questions,
});

const mapDispatchToProps = {
  addQuestion: actions.questions.addQuestion.REQUEST,
  addLike: actions.questions.addLike.REQUEST,
  triggerStar: actions.questions.triggerStar.REQUEST,
  triggerDone: actions.questions.triggerDone.REQUEST,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Questions);
