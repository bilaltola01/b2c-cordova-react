"use strict";

import { GeoUtils } from './geo-utils.js';

export let NavigatorUtils = {
  /**
  * Returns the browser language using user preferences. If none defined, returns language using geo data
  * @function
  * @param {string} address - plain text address.
  * @returns Promise containing the full geo data
  */
  getFirstBrowserLanguage: function (nav) {
    return new Promise((resolve, reject) => {
      let getBrowserLanguage = () => {
        let browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
        i,
        language;

        // Support for HTML 5.1 "navigator.languages"
        if (Array.isArray(nav.languages)) {
          for (i = 0; i < nav.languages.length; i++) {
            language = nav.languages[i];
            if (language && language.length) {
              return language;
            }
          }
        }

        // Support for other well known properties in browsers
        for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
          language = nav[browserLanguagePropertyKeys[i]];
          if (language && language.length) {
            return language;
          }
        }

        return null;
      };

      resolve(getBrowserLanguage());
    });
  },

  getLanguageFromGeolocation: function (location) {
    return GeoUtils.convertLatLong(location.latitude, location.longitude).then(function (geo) {
      return Promise.resolve(geo.countryCode);
    });
  },

  getLanguage: function (nav, location) {
    //let lang = this.getFirstBrowserLanguage(nav);
    let lang = Promise.resolve('en-GB');
    return (lang) ? lang : this.getLanguageFromGeolocation(location);
  }
};