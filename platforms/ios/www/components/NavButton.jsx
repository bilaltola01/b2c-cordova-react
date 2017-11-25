import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

const classNames = require('classnames');

<<<<<<< HEAD
import NavMenu from './NavMenu';

=======
>>>>>>> 527bce22db10fb800e6664a521e2dcd562506bd8
let createHandlers = (ctx) => {
	let onPickLanguageClick = () => {
		ctx.props.dispatch(actionCreators.setOffCanvas({
			isOpened: true,
			type: 'PickLanguage',
			transition: null
		}));
	};

	/*
	let getCurrentLanguage = () => {
		ctx.props.dispatch(actionCreators.getCurrentLanguage((lang) => {
			ctx.setState({
				currentLanguage: lang
			});
		}));
	};
	*/

	return {
		onPickLanguageClick
	};
};

class NavButton extends Component {
	constructor(props){
		super(props);
		this.handlers = createHandlers(this);
	}

	render() {
		const { title, position, action } = this.props;

		const classes = classNames(
			'button',
			'button--' + position
		);

		const currentLanguage = this.props.currentLanguage || {};

		const pickLanguageComponent = (currentLanguage) ?
			(currentLanguage.Flag && currentLanguage.Flag.Path) ? (
				<div className="choose-lang" onClick={this.handlers.onPickLanguageClick}>
					<img src={currentLanguage.Flag.Path} alt="" />
				</div>
			) : (
				<div className="choose-lang" onClick={this.handlers.onPickLanguageClick}>
					<span>{currentLanguage.Title}</span>
				</div>
			)
		: null;

<<<<<<< HEAD
		const menuComponent = (<NavMenu isOpenedDefault={false} />);

=======
>>>>>>> 527bce22db10fb800e6664a521e2dcd562506bd8
		const actionComponent = (action && action.type) ? ((a) => {
			switch (a.type) {
				case 'link':
					return <Link to={a.path}>{title}</Link>
<<<<<<< HEAD
				case 'menu':
					return menuComponent
=======
>>>>>>> 527bce22db10fb800e6664a521e2dcd562506bd8
				case 'click':
					return <span onClick={a.component.fn}>{title}</span>
				case 'pick-language':
					return pickLanguageComponent

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


const mapStateToProps = (state) => {
	console.log(state);
  	return {
    	currentLanguage: state._currentLanguage.currentLanguage
  	};
};

export default connect(mapStateToProps)(NavButton);