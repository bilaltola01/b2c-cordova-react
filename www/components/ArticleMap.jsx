import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';
import pushAnalytics from '../shared/analytics.utils';

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
      console.error(err);
    });
  };

  let onMarkerClick = (marker, restaurant, index) => {
    pushAnalytics({
      'event': 'mapMarkerClick',
      'branchAddress': restaurant.Address,
      'branchCity': restaurant.City,
      'branchName': restaurant.Name,
      'branchCountry': restaurant.Country,
      'branchID': restaurant.BranchID,
      'companyID': restaurant.CompanyID,
      'companyName': restaurant.CompanyName,
      'companyWebsite': restaurant.CompanyWebsite
    }, {
      event: 'mapMarkerClick',
			type: 'Branch',
			id: restaurant.branchID,
			title: restaurant.Name,
    });
    
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
      icon: 'assets/images/map-marker-2.png',
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

  bindBoundsChanged(google, map) {
    this.zoomChangeBoundsListener = google.maps.event.addListener(map, 'bounds_changed', function (event) {
      if (this.getZoom() > 15 && this.initialZoom == true) {
        // Change max/min zoom here
        this.setZoom(15);
        this.initialZoom = false;
      }
      google.maps.event.removeListener(this.zoomChangeBoundsListener);
    });
  }

  setupMap(map, google, restaurants) {
    if (!restaurants || restaurants.length <= 0) {
      return ;
    }

    let bounds = new google.maps.LatLngBounds();

    restaurants.forEach((restaurant, index) => {
      // Extend the bounds to all markers
      let location = new google.maps.LatLng(restaurant.Latitude, restaurant.Longitude);
      bounds.extend(location);

      // Create marker
      let marker = this.createMarker(map, google, restaurant);

      // Bind marker events
      this.bindMarkerEvents(google, marker, restaurant, index);
    });

    this.googleMap.fitBounds(bounds);
  }

  componentDidMount() {
    let defaultCenterPosition = {
      lat: 14.585850,
      lng: 121.059557
    };

    this.handlers.initGoogleMaps().then(google => {
      this.googleMap = new google.maps.Map(document.getElementById('map-canvas'), {
        mapTypeId: 'roadmap',
        center: defaultCenterPosition
      });

      // Listen for zoom/bounds change and sync the zoom while bounds change
      google.maps.event.addListener(this.googleMap, 'zoom_changed', () => {
        this.bindBoundsChanged(google, this.googleMap);
      });

      this.googleMap.initialZoom = true;

      let restaurants = this.props.restaurants;
      this.setupMap(this.googleMap, google, restaurants);

      /*
        // Restore the zoom level after the map is done scaling
        let idleListener = google.maps.event.addListener(this.googleMap, 'idle', () => {
            this.googleMap.setZoom(13);
            google.maps.event.removeListener(idleListener);
        });
      */
    });
  }

  render() {
		const { restaurants } = this.props;

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
    return {
        offCanvas: state._offCanvas.offCanvas
    };
};

export default connect(mapStateToProps)(ArticleMap);