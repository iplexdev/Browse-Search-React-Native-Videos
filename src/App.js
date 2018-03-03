import React, { Component } from 'react';
import axios from 'axios';
import './styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.apiUrl = 'https://www.googleapis.com/youtube/v3/search';
    this.apiKey = 'AIzaSyBeimXtjgzfQcogY-fP8_CHPybmLpFaieo';
    this.state = {};
  }

  componentDidMount() {
    axios
      .get(`${this.apiUrl}?key=${this.apiKey}&part=snippet&type=video&q=surf`)
      .then(response => console.log(response));
  }

  render() {
    return (
      <div className="">
        <h1>Surf Videos</h1>
      </div>
    );
  }
}
export default App;
