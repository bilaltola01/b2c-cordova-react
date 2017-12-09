import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import ArticleMenuDetail from './ArticleMenuDetail';
import SubNav from './SubNav';

let createHandlers = (ctx) => {
	let onNavItemClick = (item) => {
		ctx.setState({
			currentSubNavItem: item.index
		});
	};

	return {
		onNavItemClick
	};
};

class SectionMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentSubNavItem: 0
		};
		this.handlers = createHandlers(this);
	}

	getFirstLanguage(languages) {
		console.log(languages);
		if (!languages || languages.length <= 0) {
			return null;
		}

		return languages[0];
	}

	render() {
		const { menu, currency } = this.props.component;

		//
		// get currentlanguage from store, not like this
		//

		const finalLanguage = this.props.currentLanguage;//|| this.getFirstLanguage(menu.languages);

		const categoriesComponent = (menu && menu.categories && menu.categories.length > 0) ? menu.categories.map((category, index) => {
			return <ArticleMenuDetail currentItem={currentItem} category={category} currency={currency} language={finalLanguage} key={index} />;
		}) : null;

		const currentItem = this.state.currentSubNavItem || 0;

		const subnavComponent = (menu && menu.categories && menu.categories.length > 0) ? (
			<SubNav categories={menu.categories} currentItem={currentItem} onNavItemClick={this.handlers.onNavItemClick} />
		) : null;

		const containerWidth = (menu && menu.categories && menu.categories.length > 0) ? (
			(100 * menu.categories.length) + '%'
		) : '100%';

		const translate = (menu && menu.categories && menu.categories.length > 0) ? (
			'translateX('+ -((this.state.currentSubNavItem * 100) / menu.categories.length) + '%)'
		) : '0%';

		return (
			<div>
				{subnavComponent}

				<div className="menu-categories menu-detail">
					<div className="categories-container" data-item-active={currentItem} style={{width: containerWidth, transform: translate}}>
						{categoriesComponent}
					</div>
				</div>
			</div>
		)
	}
};

SectionMenu.propTypes = {
    component: PropTypes.object
};

const mapStateToProps = (state) => {
  	return {
    	currentLanguage: state._currentLanguage.currentLanguage
  	};
};

export default connect(mapStateToProps)(SectionMenu);