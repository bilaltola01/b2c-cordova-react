import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import Splashscreen from './Splashscreen';
import PageContent from './PageContent';

import { Pages } from './Pages';

class PageRestaurants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removed: false
    };
  }

  render () {
    const title = Pages.getPageAttribute('Home', 'title');
    const navigation = Pages.getPageAttribute('Home', 'navigation');
    const footer = Pages.getPageAttribute('Home', 'footer');
    const offCanvasSettings = Pages.getPageAttribute('Home', 'offCanvas');

    const profile = (this.props.profile ) ? this.props.profile : [];

    const restaurants = (profile && profile.length > 0) ?
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

    const sections = [{
      type: 'restaurants',
      title: '',
      component: restaurants
    }];

    return (
      <div>
        <Splashscreen />
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

export default connect(mapStateToProps)(PageRestaurants);