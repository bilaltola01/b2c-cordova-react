import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

const classNames = require('classnames');

/*
import ChooseLanguage from './ChooseLanguage';
*/

class NavButton extends Component {
	render() {
		const { title, position, action } = this.props;

		const classes = classNames(
			'button button--',
			position
		);

		const actionComponent = (action && action.type) ? ((a) => {
			switch (a.type) {
				case 'link':
					return <Link to={a.path}>{title}</Link>
				case 'link-offcanvas':
					return
						<div className="choose-lang">
							<img src={a.component.flag.url} alt="" />
						</div>

			}
		})(action) : null;

		return (
			<div className={classes}>
				{actionComponent}
			</div>
		);
	}
};

NavButton.propTypes = {
	title: PropTypes.string,
	position: PropTypes.string,
	action: PropTypes.object
};

export default NavButton;