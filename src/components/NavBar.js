import React from 'react';
import SearchInput from './SearchInput';

class NavBar extends React.Component {
  render() {
    return (
      <nav className="NavBar">
        <a href="/" className="home">
          <span>Surf Videos </span>
          <span role="img" aria-label="surfing">
            🏄‍♂️
          </span>
        </a>
        <SearchInput />
      </nav>
    );
  }
}

export default NavBar;
