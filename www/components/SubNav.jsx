import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

const classNames = require('classnames');
const Flickity = require('flickity');
import * as DomUtils from '../shared/dom.utils';
import pushAnalytics from './Analytics/analytics.service';

let createHandlers = (ctx) => {
	let onItemClick = (item, companyId) => {
		const menuCategory = ctx.props.categories && ctx.props.categories.length > 0 ? ctx.props.categories[item.index] : null;

		pushAnalytics({
	      'event': 'menuCategoryClick',
	      'menuID': menuCategory.MenuID,
	      'menuCategoryID': menuCategory.MenuCategoryID,
	      'categoryStandardID': menuCategory.Category.CategoryStandardID,
	      'menuCategoryTitle': menuCategory.Category.Title,
	      'menuCategoryDescription': menuCategory.Category.Description
	    }, {
			event: 'menuCategoryClick',
			type: 'MenuCategory',
			id: menuCategory.MenuCategoryID,
			title: menuCategory.Title,
			companyId: companyId,
		});

		if (ctx.props.onNavItemClick) {
			ctx.props.onNavItemClick(item);
		}
	};

	let initNavigation = (el) => {
		ctx.nav = new Flickity(el, {
			cellAlign: 'left',
			freeScroll: true,
			prevNextButtons: false,
		    pageDots: false,
		    contain: true
		});

		const index = ctx.state.currentSubNavItem;
		const menuCategory = ctx.props.categories && ctx.props.categories.length > 0 ? ctx.props.categories[index] : null;
		if (index == 0 && menuCategory) {
			pushAnalytics({
		      'event': 'menuFirstCategoryClick',
		      'menuID': menuCategory.MenuID,
		      'menuCategoryID': menuCategory.MenuCategoryID,
		      'categoryStandardID': menuCategory.Category.CategoryStandardID,
		      'menuCategoryTitle': menuCategory.Category.Title,
		      'menuCategoryDescription': menuCategory.Category.Description
		    }, {
				event: 'menuFirstCategoryClick',
				type: 'MenuCategory',
				id: menuCategory.MenuCategoryID,
				title: menuCategory.Title,
				companyId: ctx.props.companyId,
			});
		}

		// Handle carousel links
		ctx.nav.on('staticClick', (e, pointer, el, index) => {
			if (!el) {
				return;
			}

			DomUtils.removeClass(document.querySelector('.subnav--item.active'), 'active');
			DomUtils.toggleClass(document.querySelectorAll('.subnav--item')[index], 'active');
			onItemClick({index: index}, ctx.props.companyId);
		});
	};

	return {
		onItemClick,
		initNavigation
	};
};

class SubNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentSubNavItem: props.currentItem || 0
		};
		this.handlers = createHandlers(this);
	}

	componentDidMount() {
		this.handlers.initNavigation(document.getElementById('navigation-scroll'));
	}

	render() {
		const { categories, companyId, currentItem, onNavItemClick } = this.props;

		const categoriesComponent = (categories && categories.length > 0) ? categories.map((category, index) => {
			return (currentItem === index) ? (
				<li key={index}><div className="subnav--item active">{category.Category.Title}</div></li>
			) : (
				<li key={index}><div className="subnav--item">{category.Category.Title}</div></li>
			)
		}) : null;

		const classes = classNames(
			'navigation-scroll',
			(categories.length <= 3 && categories.length > 1) ? 'subnav-' + categories.length + '-items' : ''
		);

		return (
			<div id="navigation-scroll-container" className="subnav navigation-scroll-container">
				<nav>
					<ul id="navigation-scroll" className={classes}>
						{categoriesComponent}
					</ul>
				</nav>
			</div>
		)
	}
};

SubNav.propTypes = {
    categories: PropTypes.array,
    currentItem: PropTypes.number,
    onNavItemClick: PropTypes.func
};

export default SubNav;