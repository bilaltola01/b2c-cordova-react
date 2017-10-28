import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import PageContent from './PageContent';

import { Pages } from './Pages';

class PageMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removed: false
    };
  }

  render () {
    const title = Pages.getPageAttribute('Map', 'title');
    const navigation = Pages.getPageAttribute('Map', 'navigation');
    const footer = Pages.getPageAttribute('Map', 'footer');
    const offCanvasSettings = Pages.getPageAttribute('Map', 'offCanvas');

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
      type: 'map',
      title: '',
      component: restaurants
    }];

    return (
      <PageContent title={title} sections={sections} navigation={navigation} footer={footer} offCanvasSettings={offCanvasSettings} />
    )
  }
};

const mapStateToProps = (state) => {
  return {
    offCanvas: state._offCanvas.offCanvas,
    profile: state._profile.profile
  };
};

export default connect(mapStateToProps)(PageMap);