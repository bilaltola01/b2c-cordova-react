import * as Profile from './profile.reducer';
import * as Geolocation from './geolocation.reducer';
import * as OffCanvas from './offcanvas.reducer';
import * as CurrentLanguage from './current-language.reducer';
import * as BranchLanguages from './branch-languages.reducer';

const _profile = Profile._profile;
const _geolocation = Geolocation._geolocation;
const _offCanvas = OffCanvas._offCanvas;
const _currentLanguage = CurrentLanguage._currentLanguage;
const _branchLanguages = BranchLanguages._branchLanguages;

export {
    _profile,
    _geolocation,
    _offCanvas,
    _currentLanguage,
    _branchLanguages
}