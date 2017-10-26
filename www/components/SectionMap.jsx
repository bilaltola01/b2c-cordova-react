import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import ArticleMap from './ArticleMap';

class SectionMap extends Component {
	render() {
		const { restaurants } = this.props;

		const profile = (this.props.profile ) ? this.props.profile : [];

		const mapRestaurants = (profile && profile.length > 0) ?
			profile.reduce((acc, current) => {
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

		console.log(mapRestaurants);

		const map = (mapRestaurants && mapRestaurants.length > 0) ? (
			<ArticleMap restaurants={mapRestaurants} />
		) : null;

		return (
			<section id="section-map" className="section section--map">
				{map}
			</section>
		)
	}
};

SectionMap.propTypes = {
    restaurants: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    geolocation: state._geolocation.geolocation,
    profile: state._profile.profile
  };
};

export default connect(mapStateToProps)(SectionMap);