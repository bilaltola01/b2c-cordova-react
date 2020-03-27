import React, { Component, PropTypes } from 'react';

import NavButton from './NavButton';

class PageHeader extends Component {
  	render() {
  		const { title, leftButtons, rightButtons, pageType } = this.props;

  		const leftButtonsComponent = (leftButtons && leftButtons.length > 0) ? leftButtons.map((button, index) => {
  			return <NavButton position={button.position} action={button.action} title={button.title} key={index} pageType={pageType} />;
  		}) : null;

  		const rightButtonsComponent = (rightButtons && rightButtons.length > 0) ? rightButtons.map((button, index) => {
  			return <NavButton position={button.position} action={button.action} title={button.title} key={index} />;
  		}) : null;

		return (
			<header id="header" className="header">
				<div className="buttons-left">
					{leftButtonsComponent}
				</div>
				<div className="buttons-right">
					{rightButtonsComponent}
				</div>

				<h2 className="header--headline">{title}</h2>
	    	</header>
		)
	}
};

PageHeader.propTypes = {
	title: PropTypes.string,
	leftButtons: PropTypes.array,
	rightButtons: PropTypes.array,
	pageType: PropTypes.string,
};

export default PageHeader;


