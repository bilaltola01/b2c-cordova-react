import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

const classNames = require('classnames');

import NavMenu from './NavMenu';

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

		const menuComponent = (<NavMenu isOpenedDefault={false} />);

		const actionComponent = (action && action.type) ? ((a) => {
			switch (a.type) {
				case 'link':
					return <Link to={a.path}>{title}</Link>
				case 'menu':
					return menuComponent
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