import React, { Component, PropTypes } from 'react';

class Splashscreen extends Component {
  render () {
    return (
      <div className="splashscreen">
        <div className="logo">
          <h1>
            <img src="assets/images/logo-one-menu-white.svg" alt="One Menu Logo" />
          </h1>
        </div>
      </div>
    )
  }
};

export default Splashscreen;