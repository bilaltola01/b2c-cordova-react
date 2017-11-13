
var initialLanguageState = {};

export function _branchLanguages(state = initialLanguageState, action) {
  console.log('_branchLanguages reducer called with state ', state , ' and action ', action);

  switch (action.type) {
    case 'SET_BRANCH_LANGUAGES_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'SET_BRANCH_LANGUAGES_SUCCESS':
      return {
        ...state,
        branchLanguages: action.result,
        completed: true
      }
    case 'SET_BRANCH_LANGUAGES_FAILURE':
      // we could add an error message here, to be printed somewhere in our application
      return {
        ...state,
        completed: true
      }
    default:
      return state
  }
}