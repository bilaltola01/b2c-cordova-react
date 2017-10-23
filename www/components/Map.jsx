import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import PageContent from './PageContent';


class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removed: false
    };
    this.handlers = createHandlers(this);
  }

  render () {
    const { dispatch, navigation, title, footer, offCanvas } = this.props;

    const profile = (this.props.profile ) ? this.props.profile : {};
    const location = (this.props.location) ? this.props.location : {};

    const sections = [{
      type: 'map',
      title: '',
      component: profile
    }];

    return (
      <div id="container" className="container">
        <PageContent title={title} sections={sections} navigation={navigation} footer={footer} offCanvas={offCanvas} />
      </div>
    )
  }
};

Map.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object,
  title: PropTypes.string,
  footer: PropTypes.object,
  offCanvas: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    location: state._location.location,
    profile: state._profile.profile
  };
};

export default connect(mapStateToProps)(Map);