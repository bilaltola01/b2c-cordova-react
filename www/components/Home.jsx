import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import Splashscreen from './Splashscreen';
import PageContent from './PageContent';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removed: false
    };
  }

  render () {
    const { dispatch, navigation, title, footer, offCanvas } = this.props;

    const profile = (this.props.profile ) ? this.props.profile : {};
    const geolocation = (this.props.geolocation) ? this.props.geolocation : {};

    console.log(geolocation);

    const sections = [{
      type: 'restaurants',
      title: '',
      component: profile
    }];

    return (
      <div id="container" className="container">
        <Splashscreen />
        <PageContent title={title} sections={sections} navigation={navigation} footer={footer} offCanvas={offCanvas} />
      </div>
    )
  }
};

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object,
  title: PropTypes.string,
  footer: PropTypes.object,
  offCanvas: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    geolocation: state._geolocation.geolocation,
    profile: state._profile.profile
  };
};

export default connect(mapStateToProps)(Home);