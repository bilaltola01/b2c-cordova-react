import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

const classNames = require('classnames');

import SectionRestaurants from './SectionRestaurants';
import SectionMap from './SectionMap';

class PageSection extends Component {
	render() {
		const { type, title, component } = this.props;

		/*
		const dataText = type.split('-')[0];
		const action = type.substring(type.lastIndexOf('-') + 1, type.length);
		const actionText = (action.length > 0 && action !== type && action !== 'get') ? action.charAt(0).toUpperCase() + action.slice(1) : '';
	*/

		const restaurants = (component && component.length > 0) ?
			component.reduce((acc, current) => {
				return acc.concat(current.branches.map(branch => {
					let obj = branch;

					obj.CompanyName = current.Name;
					obj.CompanyWebsite = current.Website;
					obj.CompanyEmail = current.Email;
					obj.CompanyTel = current.Tel;

					return obj;
				}));
			}, [])
		: [];

		console.log(component);

		return (type) ? ((articleType) => {
			switch (articleType) {
				case 'restaurants':
					return <SectionRestaurants restaurants={restaurants} />;
				case 'map':
					return <SectionMap restaurants={restaurants} />
			}
		})(type) : null;
	}
};

PageSection.propTypes = {
	type: PropTypes.string,
	title: PropTypes.string,
    component: PropTypes.array
};

export default PageSection;