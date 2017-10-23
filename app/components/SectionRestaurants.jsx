import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import ArticleRestaurant from './ArticleRestaurant';

class SectionRestaurants extends Component {
	render() {
		const { component } = this.props;

		const restaurants = (component && component.length > 0) ? (
			return component.reduce((acc, current) => {
				return acc.concat(current.branches.map(branch => {
					let obj = branch;

					obj.CompanyName = current.Name;
					obj.CompanyWebsite = current.Website;
					obj.CompanyEmail = current.Email;
					obj.CompanyTel = current.Tel;

					return obj;
				}));
			}, []);
		) : [];

		console.log(restaurants);

		const articles = (restaurants && restaurants.length > 0) ? restaurants.map((restaurant, index) => {
			return <ArticleRestaurant restaurant={restaurant} key={index} />;
		}) : null;

		return (
			<section className="section section--restaurants">
				{articles}
			</section>
		)
	}
};

SectionRestaurants.propTypes = {
    component: PropTypes.object
};

export default SectionRestaurants;