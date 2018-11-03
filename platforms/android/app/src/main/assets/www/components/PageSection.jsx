import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

const classNames = require('classnames');

import SectionRestaurants from './SectionRestaurants';
import SectionMenus from './SectionMenus';
import SectionMenu from './SectionMenu';
import SectionMap from './SectionMap';

class PageSection extends Component {
	render() {
		const { type, title, component } = this.props;

		return (type) ? ((articleType) => {
			switch (articleType) {
				case 'restaurants':
					return <SectionRestaurants component={component} />;
				case 'restaurant-menus':
					return <SectionMenus component={component} />;
				case 'restaurant-menu':
					return <SectionMenu component={component} />;
				case 'map':
					return <SectionMap component={component} />
			}
		})(type) : null;
	}
};

PageSection.propTypes = {
	type: PropTypes.string,
	title: PropTypes.string,
    component: PropTypes.object
};

export default PageSection;