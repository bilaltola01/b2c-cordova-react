import React, { Component, PropTypes } from 'react';

class Page extends Component {
  render () {
    return (
        <div id={"page"} className="page">
            {this.props.children}
        </div>
    )
  }
};

export default Page;
