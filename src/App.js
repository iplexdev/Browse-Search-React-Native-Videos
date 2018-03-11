import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home';
import SearchResults from './components/SearchResults';
import VideoSingle from './components/VideoSingle';
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
              <Route
                path="/search/:query"
                render={props => {
                  return <SearchResults query={props.match.params.query} />;
                }}
              />
              <Route
                exact
                path="/video/:videoId"
                render={props => {
                  return <VideoSingle videoId={props.match.params.videoId} />;
                }}
              />
              <Route render={props => <div className="notfound">404</div>} />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
