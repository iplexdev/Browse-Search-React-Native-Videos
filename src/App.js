import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home';
import SearchResults from './components/SearchResults';
import Video from './components/Video';

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
      <BrowserRouter>
        <div>
          <NavBar />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/search/:query" component={SearchResults} />
            <Route path="/video/:videoId" component={Video} />
            <Route render={props => <div>404 Not Found.</div>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
