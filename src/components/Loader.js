import React from 'react';

class Loader extends React.Component {
  render() {
    return (
      <div className="Loader">
        <div className="ex ex--light">
          <div className="mnml-spinner dark mx-auto" />
        </div>
      </div>
    );
  }
}

export default Loader;
