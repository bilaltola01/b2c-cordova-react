import React, { Component, PropTypes } from 'react';

class Page extends Component {
  render () {
    return (
        <div className="page">
        	<div id="container" className="container">
            	{this.props.children}
            </div>
        </div>
    )
  }
};

export default Page;
