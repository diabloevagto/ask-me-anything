import React, { Component } from 'react';
import styled from 'styled-components';
import * as R from 'ramda';
import produce from 'immer';

import AskInput from '../components/AskInput';
import Question from '../components/Question';

const Lists = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class Questions extends Component {
  state = {
    questions: [
      {
        context: 'a',
        star: false,
        done: false,
        like: 0,
        timestamp: 0,
      },
      {
        context: 'b',
        star: true,
        done: false,
        like: 3,
        timestamp: 1,
      },
      {
        context: 'c',
        star: true,
        done: false,
        like: 5,
        timestamp: 2,
      },
      {
        context: 'd',
        star: true,
        done: true,
        like: 0,
        timestamp: 3,
      },
      {
        context: 'e',
        star: true,
        done: false,
        like: 0,
        timestamp: 4,
      },
    ],
  };

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

  addQuestion = context =>
    this.setState(
      produce(draft => {
        draft.questions.push({
          context,
          star: false,
          done: false,
          like: 0,
          timestamp: Date.now(),
        });
      }),
    );

  addLike = timestamp =>
    this.setState(
      produce(({ questions }) => {
        const target = questions.findIndex(el => el.timestamp === timestamp);
        questions[target].like++;
      }),
    );

  triggerStar = timestamp =>
    this.setState(
      produce(({ questions }) => {
        const target = questions.findIndex(el => el.timestamp === timestamp);
        questions[target].star = !questions[target].star;
      }),
    );

  triggerDone = timestamp =>
    this.setState(
      produce(({ questions }) => {
        const target = questions.findIndex(el => el.timestamp === timestamp);
        questions[target].done = !questions[target].done;
      }),
    );

  render() {
    const { questions } = this.state;
    return (
      <div>
        <AskInput onAdd={this.addQuestion} />
        <Lists>
          {this.sortQuestion(questions).map((q, idx) => (
            <Question
              key={idx}
              {...q}
              addLike={() => this.addLike(q.timestamp)}
              triggerStar={() => this.triggerStar(q.timestamp)}
              triggerDone={() => this.triggerDone(q.timestamp)}
            />
          ))}
        </Lists>
      </div>
    );
  }
}

export default Questions;
