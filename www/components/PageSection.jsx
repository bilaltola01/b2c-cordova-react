import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

const classNames = require('classnames');

import SectionRestaurants from './SectionRestaurants';
import SectionMenus from './SectionMenus';
import SectionMap from './SectionMap';

class PageSection extends Component {
	render() {
		const { type, title, component } = this.props;

		console.log(component);

		return (type) ? ((articleType) => {
			switch (articleType) {
				case 'restaurants':
					return <SectionRestaurants restaurants={component} />;
				case 'restaurant-menus':
					return <SectionMenus restaurants={component} />;
				case 'map':
					return <SectionMap restaurants={component} />
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