
var initialLanguageState = {};

export function _menuLanguages(state = initialLanguageState, action) {
  console.log('_menuLanguages reducer called with state ', state , ' and action ', action);

  switch (action.type) {
    case 'SET_MENU_LANGUAGES_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'SET_MENU_LANGUAGES_SUCCESS':
      return {
        ...state,
        menuLanguages: action.result,
        completed: true
      }
    case 'SET_MENU_LANGUAGES_FAILURE':
      // we could add an error message here, to be printed somewhere in our application
      return {
        ...state,
        completed: true
      }
    default:
      return state
  }
}