'use strict';

import 'whatwg-fetch';
const constants = require('../constants');

const SERVER_URL =
  constants.ENV_MODE === 'DEV' ? 'http://localhost:8079' : 'https://one-menu-b2b.herokuapp.com';
const BASE_URL = constants.SERVER_URL || SERVER_URL;

export let Ajax = url => {
  let baseUrl = url || BASE_URL + '/api';
  //
  /** Generic method for AJAX calls */
  //
  function query(obj) {
    console.log(obj);
    return fetch(obj.path, obj.opts)
      .then(checkStatus)
      .then(parseJSON);
  }

  //
  /** Create full object for the query */
  //
  function createQuery(endpoint, opts, method) {
    let options = opts;
    options.method = method;

    return {
      path: baseUrl + endpoint,
      opts: options,
    };
  }

  //
  /** Handle errors */
  //
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }

  function parseJSON(response) {
    return response.json();
  }

  return {
    //
    /** Generic Abstracted GET method calling query */
    //
    get: function(endpoint, opts) {
      return query(createQuery(endpoint, opts, 'GET'));
    },
    //
    /** Generic Abstracted POST method calling query */
    //
    post: function(endpoint, opts) {
      return query(createQuery(endpoint, opts, 'POST'));
    },
    //
    /** Generic Abstracted PUT method calling query */
    //
    put: function(endpoint, opts) {
      return query(createQuery(endpoint, opts, 'PUT'));
    },
    //
    /** Generic Abstracted DELETE method calling query */
    //
    delete: function(endpoint, opts) {
      return query(createQuery(endpoint, opts, 'DELETE'));
    },
  };
};
