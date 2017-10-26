import React, { Component, PropTypes } from 'react';

import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import {
  HashRouter as Router,
  Route
} from 'react-router-dom';

import * as actionCreators from '../action-creators';

/*
import RestaurantPage from './RestaurantPage';
import MenusPage from './MenusPage';
import MenuPage from './MenuPage';
*/
import PageMap from './PageMap';
import PageRestaurants from './PageRestaurants';

import Page from './Page';

let createHandlers = (ctx) => {
  let getGeoLocation = (location) => {
    ctx.props.dispatch(actionCreators.getGeoLocation(location, (res) => {
      getProfile(res);
    }));
  };

  let getProfile = (location) => {
    ctx.props.dispatch(actionCreators.getProfile(location));
  };

  return {
    getGeoLocation,
    getProfile
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.handlers = createHandlers(this);
  }

  componentDidMount() {
    console.log(window.navigator.geolocation);
    this.handlers.getGeoLocation(window.navigator.geolocation);
  }

  render () {
    const { dispatch } = this.props;

    const HomeRenderer = () => {
      return (
        <Redirect to={{
          pathname: '/home',
          state: { from: this.props.location }
        }} />
      );
    };

    return (
      <Router>
        <div>
          <Route path="/" render={HomeRenderer} />
          <Page>
            <Route path="/home" component={PageRestaurants} />
            <Route path="/map" component={PageMap} />
            {/*
            <Route path="/restaurants" component={RestaurantsPage} />
            <Route path="/restaurant/:id" component={RestaurantPage} />
            <Route path="/restaurant/:id/menus" component={MenusPage} />
            <Route path="/menu/:id" component={MenuPage} />
            */}
          </Page>
        </div>
      </Router>
    )
  }
};

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    profile: state._profile.profile,
  };
};

export default connect(mapStateToProps)(App);

