import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);

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

  componentDidUpdate() {
    if (this.state.toggle) {
      document.querySelector('.SearchInput input').focus();
    }
  }

  // toggle input by clicking on icon
  toggleInput() {
    this.setState({ toggle: !this.state.toggle });
  }

  // update query term
  onChange(e) {
    this.setState({ term: e.target.value });
  }

  // check if enter button was hit
  onKeyUp(e) {
    if (e.keyCode === 13) {
      this.search();
    }
  }

  search() {
    this.setState({ submitted: true });
  }

  render() {
    return (
      <div className="SearchInput">
        <button className="SearchInput__icon" onClick={this.toggleInput}>
          <span role="img" aria-label="magnifying glass">
            🔍
          </span>
        </button>
        <form action="" onSubmit={this.search}>
          <input
            type="text"
            placeholder="Search 🤙"
            onChange={this.onChange}
            onKeyUp={this.onKeyUp}
            className={this.state.toggle ? 'show' : ''}
          />
        </form>
        {this.state.submitted && (
          <Switch>
            <Redirect
              to={{
                pathname: `/search/${this.state.term}`,
                state: { term: this.state.term },
              }}
              push
            />
          </Switch>
        )}
      </div>
    );
  }
}

export default SearchInput;
