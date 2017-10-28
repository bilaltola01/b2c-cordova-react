import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import ArticleMenu from './ArticleMenu';
import ArticleRestaurantDetail from './ArticleRestaurantDetail';

class SectionMenus extends Component {
	render() {
		const { restaurants } = this.props;

		const restaurant = (restaurants && restaurants.length > 0) ? restaurants[0] : {};

		console.log(restaurant);

		const currency = (restaurant.currency && restaurant.currency.length > 0) ? restaurant.currency[0] : null;

		const articles = (restaurant && restaurant.menus && restaurant.menus.length > 0) ? restaurant.menus.map((menu, index) => {
			return <ArticleMenu menu={menu} currency={currency} key={index} />;
		}) : null;

		const restaurantDetail = (restaurant) ?  (
			<ArticleRestaurantDetail restaurant={restaurant} />
		) : null;

		return (
			<div className="menu-categories">
				<div className="categories-container">
					{restaurantDetail}

					<article id="section-menus" className="menu--category">
						{articles}
					</article>
				</div>
			</div>
		)
	}
};

SectionMenus.propTypes = {
    restaurants: PropTypes.array
};

export default SectionMenus;