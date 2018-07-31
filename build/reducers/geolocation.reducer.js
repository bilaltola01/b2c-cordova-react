
var initialGeolocationState = {};

export function _geolocation(state = initialGeolocationState, action) {
  console.log('_geolocation reducer called with state ', state , ' and action ', action);

  switch (action.type) {
    case 'GET_GEOLOCATION_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'GET_GEOLOCATION_SUCCESS':
      return {
        ...state,
        geolocation: action.result,
        completed: true
      }
    case 'GET_GEOLOCATION_FAILURE':
      // we could add an error message here, to be printed somewhere in our application
      return {
        ...state,
        completed: true
      }
    default:
      return state
  }
}