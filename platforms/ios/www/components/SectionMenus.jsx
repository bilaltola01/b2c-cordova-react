import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import ArticleMenu from './ArticleMenu';
import ArticleRestaurantDetail from './ArticleRestaurantDetail';

class SectionMenus extends Component {
	render() {
		const { restaurants, currency } = this.props.component;

		const restaurant = (restaurants && restaurants.length > 0) ? restaurants[0] : {};

		console.log(restaurant);

<<<<<<< HEAD
		const languages = (restaurant && restaurant.languages && restaurant.languages.length > 0) ? restaurant.languages : []

		const articles = (restaurant && restaurant.menus && restaurant.menus.length > 0) ? restaurant.menus.map((menu, index) => {
			return <ArticleMenu menu={menu} currency={currency} languages={languages} key={index} />;
=======
		const articles = (restaurant && restaurant.menus && restaurant.menus.length > 0) ? restaurant.menus.map((menu, index) => {
			return <ArticleMenu menu={menu} currency={currency} key={index} />;
>>>>>>> 527bce22db10fb800e6664a521e2dcd562506bd8
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
    component: PropTypes.object
};

export default SectionMenus;