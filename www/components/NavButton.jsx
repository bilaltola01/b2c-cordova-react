import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

/*
import ChooseLanguage from './ChooseLanguage';
*/

class NavButton extends Component {
	render() {
		const { title, position, action } = this.props;

		const actionComponent = (action && action.type) ? () => {
			switch (action.type) {
				case 'link':
					return <Link to={action.path} >{title}</Link>
				case 'link-offcanvas':
					return
						<div className="choose-lang">
							<img src={action.component.flag.url} alt="" />
						</div>

			}
		} : null;

		return (
			<div className={"button button--" + position}>
				{actionComponent}
			</div>
		);
	}
};

NavButton.propTypes = {
	title: PropTypes.string,
	position: PropTypes.string,
	action: PropTypes.object
}

export default NavButton;