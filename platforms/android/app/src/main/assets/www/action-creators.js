/*
import * as MenuService from './components/Menu/menu.service';
import * as LanguageService from './components/Language/language.service';
import * as CuisineService from './components/Cuisine/cuisine.service';
import * as BranchService from './components/Profile/branch.service';
import * as MenuCategoryService from './components/Menu/menu-category.service';
*/

import * as ProfileService from './components/Profile/profile.service';
import * as LanguageService from './components/Language/language.service';

import { StorageManagerInstance } from './shared/storage.utils';

/*
export function getMenu (data) {
  return {
    types: ['GET_MENU_REQUEST', 'GET_MENU_SUCCESS', 'GET_MENU_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        console.log(data);
        resolve(data);
      });
    }
  }
};

export function getMenus (cb) {
  return {
    types: ['GET_MENUS_REQUEST', 'GET_MENUS_SUCCESS', 'GET_MENUS_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        MenuService.getMenus().then((res) => {
          console.log('request succeeded with JSON response', res);

          if (res && typeof cb === 'function') {
            cb(res);
          }
        });
      });
    }
  }
};

export function getMenuTranslations (cb) {
  return {
    types: ['GET_MENU_TRANSLATIONS_REQUEST', 'GET_MENU_TRANSLATIONS_SUCCESS', 'GET_MENU_TRANSLATIONS_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        MenuService.getMenuTranslations().then((res) => {
          console.log('request succeeded with JSON response', res);

          if (res && typeof cb === 'function') {
            cb(res);
          }
        });
      });
    }
  }
};

export function setPopup (data, cb) {
  return {
    types: ['SET_POPUP_REQUEST', 'SET_POPUP_SUCCESS', 'SET_POPUP_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        console.log(data);

        if (typeof cb === 'function') {
          cb(data);
        }

        resolve(data);
      });
    }
  }
};

export function getCategories (type, cb) {
  return {
    types: ['GET_CATEGORIES_REQUEST', 'GET_CATEGORIES_SUCCESS', 'GET_CATEGORIES_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        MenuCategoryService.getCategories(type).then((res) => {
          console.log('request succeeded with JSON response', res);

          if (res && typeof cb === 'function') {
            cb(res);
          }

          resolve(res);
        });
      });
    }
  }
};

export function getLanguages (cb) {
  return {
    types: ['GET_LANGUAGES_REQUEST', 'GET_LANGUAGES_SUCCESS', 'GET_LANGUAGES_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        LanguageService.getLanguages().then((res) => {
          console.log('request succeeded with JSON response', res);

          if (res && typeof cb === 'function') {
            cb(res);
          }

          resolve(res);
        });
      });
    }
  }
};

export function getCuisines (cb) {
  return {
    types: ['GET_CUISINES_REQUEST', 'GET_CUISINES_SUCCESS', 'GET_CUISINES_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        CuisineService.getCuisines().then((res) => {
          console.log('request succeeded with JSON response', res);

          if (res && typeof cb === 'function') {
            cb(res);
          }

          resolve(res);
        });
      });
    }
  }
};
*/

export function getProfile(location, cb) {
  return {
    types: [
      'GET_PROFILE_REQUEST',
      'GET_PROFILE_SUCCESS',
      'GET_PROFILE_FAILURE',
    ],
    promise: () => {
      return new Promise((resolve, reject) => {
        ProfileService.getProfile(location).then(res => {
          if (res && typeof cb === 'function') {
            cb(res);
          }

          resolve(res);
        });
      });
    },
  };
}

export function getGeoLocation(location, cb) {
  return {
    types: [
      'GET_GEOLOCATION_REQUEST',
      'GET_GEOLOCATION_SUCCESS',
      'GET_GEOLOCATION_FAILURE',
    ],
    promise: () => {
      return new Promise((resolve, reject) => {
        ProfileService.getGeoLocation(location).then(res => {
          if (res && typeof cb === 'function') {
            cb(res);
          }

          resolve(res);
        });
      });
    },
  };
}

export function setBranchLanguages(branches, cb) {
  return {
    types: [
      'SET_BRANCH_LANGUAGES_REQUEST',
      'SET_BRANCH_LANGUAGES_SUCCESS',
      'SET_BRANCH_LANGUAGES_FAILURE',
    ],
    promise: () => {
      return new Promise((resolve, reject) => {
        let branch = branches[0];
        if (!branch || !branch.languages || branch.languages.length <= 0) {
          reject('Branch or branch languages while setting branch languages!');
        }

        const languages = branch.languages;

        if (typeof cb === 'function') {
          cb(languages);
        }

        resolve(languages);
      });
    },
  };
}

export function getCurrentLanguage(nav, location, cb) {
  return {
    types: [
      'GET_CURRENT_LANGUAGE_REQUEST',
      'GET_CURRENT_LANGUAGE_SUCCESS',
      'GET_CURRENT_LANGUAGE_FAILURE',
    ],
    promise: () => {
      return new Promise((resolve, reject) => {
        LanguageService.getCurrentLanguage(nav, location).then(res => {
          if (res && typeof cb === 'function') {
            cb(res);
          }

          resolve(res);
        });
      });
    },
  };
}

export function setCurrentLanguage(lang, cb) {
  return {
    types: [
      'SET_CURRENT_LANGUAGE_REQUEST',
      'SET_CURRENT_LANGUAGE_SUCCESS',
      'SET_CURRENT_LANGUAGE_FAILURE',
    ],
    promise: () => {
      return new Promise((resolve, reject) => {
        if (typeof cb === 'function') {
          cb(lang);
        }

        resolve(lang);
      });
    },
  };
}

export function setOffCanvas(data, cb) {
  return {
    types: [
      'SET_OFFCANVAS_REQUEST',
      'SET_OFFCANVAS_SUCCESS',
      'SET_OFFCANVAS_FAILURE',
    ],
    promise: () => {
      return new Promise((resolve, reject) => {
        if (typeof cb === 'function') {
          cb(data);
        }

        resolve(data);
      });
    },
  };
}
