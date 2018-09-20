import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as R from 'ramda';

import AskInput from '../components/AskInput';
import Question from '../components/Question';

import actions from '../redux/actions';

import app from '../firebase/initializeFirebase';

const { db } = app;

const Lists = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class Questions extends Component {
  componentWillMount() {
    const { setEventId, firestoreUpdate } = this.props;

    const eventId = window.location.href.split('/').pop() || Date.now();
    setEventId(eventId);

    db.collection(eventId).onSnapshot(querySnapshot => {
      var questions = [];
      querySnapshot.forEach(doc => {
        questions.push({ id: doc.id, ...doc.data() });
      });
      firestoreUpdate(questions);
    });
  }

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
      eventId,
      questions,
      addQuestion,
      addLike,
      triggerStar,
      triggerDone,
    } = this.props;

    return (
      <div>
        <h1>event id: {eventId}</h1>
        <AskInput onAdd={addQuestion} />
        <Lists>
          {this.sortQuestion(questions).map((q, idx) => (
            <Question
              key={q.id}
              {...q}
              addLike={() => addLike(q.id)}
              triggerStar={() => triggerStar(q.id)}
              triggerDone={() => triggerDone(q.id)}
            />
          ))}
        </Lists>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  eventId: state.event.eventId,
  questions: state.questions.questions,
});

const mapDispatchToProps = {
  setEventId: actions.event.setEventId,
  firestoreUpdate: actions.questions.firestoreUpdate,
  //
  addQuestion: actions.questions.addQuestion.REQUEST,
  addLike: actions.questions.addLike.REQUEST,
  triggerStar: actions.questions.triggerStar.REQUEST,
  triggerDone: actions.questions.triggerDone.REQUEST,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Questions);
