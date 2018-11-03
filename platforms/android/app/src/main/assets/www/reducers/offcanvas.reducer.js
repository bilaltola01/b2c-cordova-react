
var initialOffCanvasState = {};

export function _offCanvas(state = initialOffCanvasState, action) {
  console.log('_offCanvas reducer called with state ', state , ' and action ', action);

  switch (action.type) {
    case 'SET_OFFCANVAS_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'SET_OFFCANVAS_SUCCESS':
      return {
        ...state,
        offCanvas: action.result,
        completed: true
      }
    case 'SET_OFFCANVAS_FAILURE':
      // we could add an error message here, to be printed somewhere in our application
      return {
        ...state,
        completed: true
      }
    default:
      return state
  }
}