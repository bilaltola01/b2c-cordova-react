"use strict";

const geocoder = require('node-geocoder')({
	provider: 'google'
});

export let GeoUtils = {
	/**
 	* Returns the full geo data associated to an address using a geocoder
	* @function
	* @param {string} address - plain text address.
	* @returns Promise containing the full geo data
	*/
	geocodeAddress: function (address) {
		return geocoder.geocode(address);
	},

	/**
 	* Converts an address to {lat, long} using a geocoder
	* @function
	* @param {string} address - plain text address.
	* @returns Promise containing {lat, long}
	*/
	convertToLatLong: function (address) {
	    return this.geocodeAddress(address).then(function (geodata) {
	    	if (!geodata || geodata.length <= 0) {
	    		return Promise.reject(geodata);
	    	}

	    	return geodata.map(function (res) {
		    	return { latitude: res.latitude, longitude: res.longitude };
		    })[0];
	    }).catch(function (err) {
	    	console.error(err);
	    	return { latitude: null, longitude: null };
	    });
	},

	/**
 	* Calculates the 'as-the-crow-flies' distance between 2 coordinates {latitude, longitude}
	* @function
	* @param {latitude, longitude} coord1 - coordinate to calculate distance from.
	* @param {latitude, longitude} coord2 - coordinate to calculate distance to.
	* @returns the s-distance in kilometres {float}
	*/
	calculateDistance: function (coord1, coord2) {
		const earthRadius = 6378137;

		// Haversine formula
		const dLat = this.toRadians(coord2.latitude - coord1.latitude);
  		const dLong = this.toRadians(coord2.longitude - coord1.longitude);

  		const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    		Math.cos(this.toRadians(coord1.latitude)) * Math.cos(this.toRadians(coord2.latitude)) *
    		Math.sin(dLong / 2) * Math.sin(dLong / 2);
    	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		return Math.floor((earthRadius * c) / 1000);
	},

	toRadians: function (x) {
		return x * Math.PI / 180;
	}
};