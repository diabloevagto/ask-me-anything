import React from 'react';
import styled from 'styled-components';

const List = styled.div`
  border: solid;
  width: 50%;
  margin: 5px;
  display: flex;
  justify-content: space-between;

  & > div {
    width: 20%;
    display: flex;
    justify-content: space-around;
  }
`;

const Question = props => {
  const {
    context,
    star,
    done,
    like,
    addLike,
    triggerStar,
    triggerDone,
  } = props;
  return (
    <List style={{ opacity: done ? 0.3 : 1 }}>
      <p>{context}</p>
      <div>
        <p>
          <i
            className={`${star ? 'fas' : 'far'} fa-star`}
            onClick={triggerStar}
          />
        </p>
        <p>
          <i className="far fa-thumbs-up" onClick={addLike} />
          {like}
        </p>
        <p>
          <i className="far fa-trash-alt" onClick={triggerDone} />
        </p>
      </div>
    </List>
  );
};

export default Question;
