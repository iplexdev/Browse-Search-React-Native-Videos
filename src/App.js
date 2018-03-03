import React, { Component } from 'react';
import './styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('Success!');
  }

  render() {
    return (
      <button className="button" onClick={this.handleClick}>
        Click Me
      </button>
    );
  }
}
export default App;
