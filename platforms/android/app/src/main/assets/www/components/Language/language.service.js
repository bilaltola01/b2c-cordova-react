import { Ajax } from '../../shared/ajax.utils';
import { NavigatorUtils } from '../../shared/navigator.utils.js';

export function getLanguages () {
    return Ajax().get('/language', {
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache"
        }
    }).then((res) => {
        if (!res || !res.success) {
            return Promise.reject(res);
        }

        let languages = res.obj;

        return languages;
    });
}

export function filterLanguages (userLang) {
    return getLanguages().then((languages) => {
        return languages.find(language => {
            return language.CodeFull.includes(userLang);
        });
    });
}

export function getCurrentLanguage (nav, location) {
    return NavigatorUtils.getLanguage(nav, location).then((userLanguage) => {
        return filterLanguages(userLanguage);
    });
}