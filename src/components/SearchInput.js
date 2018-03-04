import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

class SearchInput extends React.Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
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

  onKeyUp(e) {
    if (e.keyCode === 13) {
      console.log('hi');
      this.search();
    }
  }

  toggleInput() {
    this.setState({ toggle: !this.state.toggle });
  }

  search() {
    this.setState({ submitted: true });
  }

  render() {
    return (
      <div className="SearchInput">
        <button className="SearchInput__icon" onClick={this.toggleInput}>
          🔍
        </button>
        <input
          type="text"
          placeholder="Search"
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          className={this.state.toggle ? 'show' : ''}
        />
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
