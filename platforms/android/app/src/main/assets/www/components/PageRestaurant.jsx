import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import Splashscreen from './Splashscreen';
import PageContent from './PageContent';

import { Pages } from './Pages';

let createHandlers = (ctx) => {
  let setBranchLanguages = (restaurant) => {
    ctx.props.dispatch(actionCreators.setBranchLanguages(restaurant));
  };

  return {
    setBranchLanguages
  };
};

class PageRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removed: false
    };
    this.handlers = createHandlers(this);
  }

  getRestaurants(propsProfile) {
    const profile = (propsProfile) ? propsProfile : [];
    return (profile && profile.length > 0) ?
      profile.reduce((acc, current) => {
        return acc.concat(current.branches.map(branch => {
          let obj = branch;

          obj.CompanyLogoPath = current.LogoPath;
          obj.CompanyLogoAltDesc = current.LogoAltDesc;
          obj.CompanyName = current.Name;
          obj.CompanyWebsite = current.Website;
          obj.CompanyEmail = current.Email;
          obj.CompanyTel = current.Tel;

          return obj;
        }));
      }, [])
    : [];
  }

  getCurrentRestaurant(restaurants, id) {
    return (restaurants && restaurants.length > 0) ? restaurants.filter(r => {
      return parseInt(r.BranchID, 10) === parseInt(id, 10);
    }) : null;
  }

  componentDidMount() {
    this.handlers.setBranchLanguages(this.getCurrentRestaurant(this.getRestaurants(this.props.profile), this.props.match.params.id));
  }

  render () {
    const title = Pages.getPageAttribute('Restaurant', 'title');
    const navigation = Pages.getPageAttribute('Restaurant', 'navigation');
    const footer = Pages.getPageAttribute('Restaurant', 'footer');
    const offCanvasSettings = Pages.getPageAttribute('Restaurant', 'offCanvas');

    const { id } = this.props.match.params;

    const restaurants = this.getRestaurants(this.props.profile);
    const restaurant = this.getCurrentRestaurant(restaurants, parseInt(id, 10));

    const currency = (restaurant && restaurant[0] && restaurant[0].currencies && restaurant[0].currencies.length > 0) ? restaurant[0].currencies[0] : null;

    const companyId = restaurant && restaurant[0] ? restaurant[0].CompanyID : null;
    const sections = [{
      type: 'restaurant-menus',
      title: '',
      component: {
        restaurants: restaurant,
        currency
      }
    }];

    return (
      <div>
        <PageContent companyId={companyId} title={title} sections={sections} navigation={navigation} footer={footer} offCanvasSettings={offCanvasSettings} />
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    offCanvas: state._offCanvas.offCanvas,
    profile: state._profile.profile
  };
};

export default connect(mapStateToProps)(PageRestaurant);