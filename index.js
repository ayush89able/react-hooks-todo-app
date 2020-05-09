import React, { Component } from 'react';
import { render } from 'react-dom';
import TodosApp from './TodosApp';
import CSSReset from '@tds/core-css-reset'
import './style.css';


class App extends Component {
  render() {
    return (
      <div>
        <CSSReset />
        <TodosApp />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
