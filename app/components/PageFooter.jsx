import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

class PageFooter extends Component {
  	render() {
  		const { title, action } = this.props;

  		const footerComponent = (action) ? (
  			switch (action.type) {
  				case 'link':
  					return <Link to={action.path}>{title}</Link>
  			}
  		) : null;

  		<footer className="popup--footer sticky">
    		{footerComponent}
		</footer>
	}
};

PageFooter.propTypes = {
	title: PropTypes.string,
	action: PropTypes.object
};

export default PageFooter;