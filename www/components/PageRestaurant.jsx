import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import Splashscreen from './Splashscreen';
import PageContent from './PageContent';

import { Pages } from './Pages';

class PageRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removed: false
    };
  }

  render () {
    const title = Pages.getPageAttribute('Restaurant', 'title');
    const navigation = Pages.getPageAttribute('Restaurant', 'navigation');
    const footer = Pages.getPageAttribute('Restaurant', 'footer');
    const offCanvasSettings = Pages.getPageAttribute('Restaurant', 'offCanvas');

    const { id } = this.props.match.params;

    const profile = (this.props.profile ) ? this.props.profile : [];

    const restaurants = (profile && profile.length > 0) ?
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

    const restaurant = (restaurants && restaurants.length > 0) ? restaurants.filter(r => {
      return parseInt(r.BranchID, 10) === parseInt(id, 10);
    }) : null;

    console.log(restaurant);

    const sections = [{
      type: 'restaurant-menus',
      title: '',
      component: restaurant
    }];

    return (
      <div>
        <PageContent title={title} sections={sections} navigation={navigation} footer={footer} offCanvasSettings={offCanvasSettings} />
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