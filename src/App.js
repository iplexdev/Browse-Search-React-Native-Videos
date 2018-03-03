import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Video from './components/Video';
import SearchResults from './components/SearchResults';
import VideoResult from './components/VideoResult';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <header>
            <NavBar />
          </header>
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/search/:query" component={SearchResults} />
              <Route path="/video/:videoId" component={VideoResult} />
              <Route
                render={props => <div className="notfound">‼️ 404 ‼️</div>}
              />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
