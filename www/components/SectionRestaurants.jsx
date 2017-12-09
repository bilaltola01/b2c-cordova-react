import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import ArticleRestaurant from './ArticleRestaurant';

class SectionRestaurants extends Component {
	render() {
		const { restaurants } = this.props.component;

		const articles = (restaurants && restaurants.length > 0) ? restaurants.map((restaurant, index) => {
			return <ArticleRestaurant restaurant={restaurant} key={index} />;
		}) : null;

		return (
			<section id="section-restaurants" className="section section--restaurants">
				{articles}
			</section>
		)
	}
};

SectionRestaurants.propTypes = {
    component: PropTypes.object
};

export default SectionRestaurants;