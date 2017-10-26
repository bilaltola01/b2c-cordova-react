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

    const offCanvas = this.props.offCanvas;

    console.log(offCanvas);

    const sections = [{
      type: 'restaurants',
      title: '',
      component: profile
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