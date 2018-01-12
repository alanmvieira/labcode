import React, { Component } from 'react';
import Header from './componentes/Header';
import Board from './componentes/Board';

class App extends Component {
  render() {
    return (
      <div id="root">
          <Header />
          <Board />
      </div> 
    );
  }
}

export default App;
