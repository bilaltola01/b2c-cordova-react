import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

const classNames = require('classnames');

import ArticleRestaurant from './ArticleRestaurant';

class PageSection extends Component {
	render() {
		const { type, title, component } = this.props;

		/*
		const dataText = type.split('-')[0];
		const action = type.substring(type.lastIndexOf('-') + 1, type.length);
		const actionText = (action.length > 0 && action !== type && action !== 'get') ? action.charAt(0).toUpperCase() + action.slice(1) : '';
	*/
	/*
		const restaurants = (component && component.length > 0) ? (
			return component.map(company => {
				return {
					id: company.CompanyID,
					name: company.Name,
					tel: ,
					branches: company.branches,
			});
		) : [];
*/

		console.log(component);

		let articleComponents = ((articleType) => {
			switch (articleType) {
				case 'restaurants':
					return <SectionRestaurants component={component} />;
			}
		})(type);

		const classes = classNames(
			'section',
			'section--' + type
		);

		return (
			<section className={classes}>
	            {articleComponents}
	        </section>
		)
	}
};

PageSection.propTypes = {
	type: PropTypes.string,
	title: PropTypes.string,
    component: PropTypes.array
};

export default PageSection;