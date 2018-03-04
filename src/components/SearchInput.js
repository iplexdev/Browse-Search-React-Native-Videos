import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

class SearchInput extends React.Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);

    this.state = {
      term: '',
      submitted: false,
      toggle: false,
    };
  }

  onChange(e) {
    this.setState({ term: e.target.value });
  }

  search() {
    this.setState({ submitted: true });
  }

  render() {
    return (
      <div className="SearchInput">
        <input type="text" placeholder="Search" onChange={this.onChange} />
        <button onClick={this.search} type="button">
          Go
        </button>
        {this.state.submitted && (
          <Switch>
            <Redirect
              to={{
                pathname: `/search/${this.state.term}`,
                state: { term: this.state.term },
              }}
            />
          </Switch>
        )}
      </div>
    );
  }
}

export default SearchInput;
