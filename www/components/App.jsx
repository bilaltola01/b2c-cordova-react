import React, { Component, PropTypes } from 'react';

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
import Map from './Map';
import Home from './Home';

import Page from './Page';

const Pages = new Map([
  ['Home', {
    title: 'Restaurants',
    navigation: {
      leftButtons: [
        {
          title: 'location',
          position: 'left',
          action: {
            type: 'link',
            path: '/map'
          }
        }
      ],
      rightButtons: []
    },
    footer: {},
    offCanvas: {}
  }],
  ['Map', {
    title: 'Map',
    navigation: {
      leftButtons: [
        {
          title: 'Back',
          position: 'left',
          action: {
            type: 'link',
            path: '/'
          }
        }
      ],
      rightButtons: []
    },
    footer: {},
    offCanvas: {
      isOpened: false,
      component: {
        type: 'MapDetail'
      }
    }
  }]
]);

let createHandlers = (ctx) => {
  let getGeoLocation = (location) => {
    ctx.props.dispatch(actionCreators.getGeoLocation(location));
  };

  let getProfile = () => {
    ctx.props.dispatch(actionCreators.getProfile());
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

  componentDidLoad() {
    this.handlers.getGeoLocation(navigator.location, (location) => {
      console.log(location);
      this.handlers.getProfile(location);
    });
  }

  getPageAttribute(page, attr) {
    return Pages.get(page)[attr];
  }

  render () {
    const { dispatch } = this.props;

    const HomeRenderer = () => {
      return (
        <Home dispatch={dispatch} title={this.getPageAttribute('Home', 'title')} navigation={this.getPageAttribute('Home', 'navigation')} footer={this.getPageAttribute('Home', 'footer')} offCanvas={this.getPageAttribute('Home', 'offCanvas')} />
      );
    };

    const MapRenderer = () => {
      return (
        <Map dispatch={dispatch} title={this.getPageAttribute('Map', 'title')} navigation={this.getPageAttribute('Map', 'navigation')} footer={this.getPageAttribute('Map', 'footer')} offCanvas={this.getPageAttribute('Map', 'offCanvas')} />
      );
    };

    return (
      <Router>
        <div>
          <Route path="/map" render={MapRenderer} />
          <Page>
            <Route path="/" render={HomeRenderer} />
            //<Route path="/restaurants" component={RestaurantsPage} />
            //<Route path="/restaurant/:id" component={RestaurantPage} />
            //<Route path="/restaurant/:id/menus" component={MenusPage} />
            //<Route path="/menu/:id" component={MenuPage} />
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

