import React, { Component } from 'react';
import { connect } from 'react-redux';

import Questions from './containers/Questions';

class App extends Component {
  render() {
    return <Questions />;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
