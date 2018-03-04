import React from 'react';
import { Redirect } from 'react-router-dom';

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
    console.log(this.state.term);
    this.setState({ submitted: true });
  }

  render() {
    if (this.state.submitted) {
      return (
        <Redirect
          to={{
            pathname: `/search/${this.state.term}`,
            state: { term: this.state.term },
          }}
        />
      );
    }

    return (
      <div className="SearchInput">
        <input type="text" placeholder="Search" onChange={this.onChange} />
        <button onClick={this.search} type="button">
          Go
        </button>
        {this.state.submitted && (
          <Redirect
            to={{
              pathname: `/search/${this.state.term}`,
              state: { term: this.state.term },
            }}
          />
        )}
      </div>
    );
  }
}

export default SearchInput;
