import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

const API_KEY = 'AIzaSyC56hlref5MVvd-CJwEKk6POlwEp9Ed6W8';

let GoogleMaps = require('google-maps');
GoogleMaps.KEY = API_KEY;

let createHandlers = (ctx) => {
  let initGoogleMaps = () => {
    return new Promise((resolve, reject) => {
      GoogleMaps.load((res) => {
        resolve(res);
      });
    }).catch((err) => {
      console.log(err);
    });
  };

  let onMarkerClick = (marker, restaurant, index) => {
    console.log('marker clicked!');
    console.log(marker);

    setOffCanvas({
      isOpened: true,
      type: 'MapDetail',
      component: {
        marker: marker,
        id: index,
        restaurant: restaurant
      }
    });
  };

  let setOffCanvas = (obj) => {
    ctx.props.dispatch(actionCreators.setOffCanvas(obj, onOffCanvasSet));
  };

  let onOffCanvasSet = (obj) => {
    console.log('offcanvas saved and opened!');
  };

  return {
    initGoogleMaps,
    onMarkerClick
  };
};

class ArticleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removed: false
    };

    this.handlers = createHandlers(this);
  }

  createMarker(map, google, restaurant) {
    let marker = new google.maps.Marker({
      position: {
        lat: restaurant.Latitude,
        lng: restaurant.Longitude
      },
      icon: 'assets/images/map-marker.png',
      map: map
    });

    this.markers = (this.markers && this.markers.length > 0) ? this.markers.push(marker) : [];

    return marker;
  }

  bindMarkerEvents(google, marker, restaurant, index) {
    google.maps.event.addListener(marker, 'click', () => {
      return this.handlers.onMarkerClick(marker, restaurant, index);
    });
  }

  setupMap(map, google, restaurants) {
    if (!restaurants || restaurants.length <= 0) {
      return ;
    }

    restaurants.forEach((restaurant, index) => {
      // Extend the bounds to all markers
      let bounds = new google.maps.LatLngBounds();
      bounds.extend({
        lat: restaurant.Latitude,
        lng: restaurant.Longitude
      });

      // Create marker
      let marker = this.createMarker(map, google, restaurant);

      // Bind marker events
      this.bindMarkerEvents(google, marker, restaurant, index);

      this.googleMap.fitBounds(bounds);
    });
  }

  componentDidMount() {
    let defaultCenterPosition = {
      lat: 14.585850,
      lng: 121.059557
    };

    this.handlers.initGoogleMaps().then(google => {
      this.googleMap = new google.maps.Map(document.getElementById('map-canvas'), {
        mapTypeId: 'roadmap',
        zoom: 13,
        center: defaultCenterPosition
      });

      let fakeRestaurants = [
        {
          Latitude: 14.553300,
          Longitude: 121.020095
        },
        {
          Latitude: 14.562958,
          Longitude: 121.036434
        },
        {
          Latitude: 14.575447,
          Longitude: 121.063505
        }
      ];

      let restaurants = this.props.restaurants.map((restaurant, index) => {
        let obj = restaurant;
        if (fakeRestaurants[index]) {
          obj.Latitude = fakeRestaurants[index].Latitude;
          obj.Longitude = fakeRestaurants[index].Longitude;
        }

        return obj;
      });

      this.setupMap(this.googleMap, google, restaurants);

      // Restore the zoom level after the map is done scaling
      let idleListener = google.maps.event.addListener(this.googleMap, 'idle', () => {
          this.googleMap.setZoom(13);
          google.maps.event.removeListener(idleListener);
      });
    });
  }

  render() {
		const { restaurants } = this.props;

    console.log(restaurants);

		return (
      <div id="map-canvas" className="map-canvas">

      </div>
    )
	}
};

ArticleMap.propTypes = {
	restaurants: PropTypes.array
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
        offCanvas: state._offCanvas.offCanvas
    };
};

export default connect(mapStateToProps)(ArticleMap);