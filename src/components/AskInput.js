import React, { Component } from 'react';
import styled from 'styled-components';

const Div = styled.div`
  margin: 5px;
  display: flex;
`;

class AskInput extends Component {
  state = { value: '' };

  render() {
    const { onAdd } = this.props;
    return (
      <Div>
        <input
          type="text"
          value={this.state.value}
          onChange={e => this.setState({ value: e.target.value })}
        />
        <button
          onClick={() => {
            this.setState({ value: '' });
            this.state.value && onAdd(this.state.value);
          }}
        >
          送出
        </button>
      </Div>
    );
  }
}

export default AskInput;
