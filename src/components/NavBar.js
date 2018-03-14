import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      submitted: false,
      toggle: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidUpdate() {
    const input = document.querySelector('.SearchInput input');
    if (this.state.toggle) {
      input.focus();
    }
    input.addEventListener('focusout', () => {
      this.setState({ toggle: false });
    });
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
      <nav className={this.state.toggle ? 'NavBar show-search' : 'NavBar'}>
        <a href="/" className="home">
          <span>Surf Videos &nbsp;</span>
          <span role="img" aria-label="surfing">
            🏄‍♂️
          </span>
        </a>
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
      </nav>
    );
  }
}

export default NavBar;
