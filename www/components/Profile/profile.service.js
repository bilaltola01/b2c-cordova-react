import { Ajax } from '../../../shared/ajax.utils';
import { GeoUtils } from '../../../shared/geo-utils.js';

export function getProfile (location) {
    return Ajax().get('/profile', {
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache"
        }
    }).then((res) => {
        if (!res || !res.success) {
            return Promise.reject(res);
        }

        let profile = res.obj;

        return getProfileWithGeo(profile, location);
    });
}

export function getProfileWithGeo (profile, location) {
    return (profile && profile.branches && profile.branches.length > 0) ?
        (!location) ?
            profile : profile.map(company => {
                let obj = company;

                let branchesWithDistance = obj.branches.map(branch => {
                    let newBranch = branch;
                    newbranch.Distance = GeoUtils.calculateDistance({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    }, {
                        latitude: newBranch.Latitude,
                        longitude: newBranch.Longitude
                    });
                    return newBranch;
                });
                obj.branches = branchesWithDistance;

                return obj;
            })
        : [];
}

export function getGeoLocation (location) {
    if (!location) {
        return Promise.reject('ERROR! Geolocation is not available!');
    }

    return new Promise((resolve, reject) => {
        let onSuccess = (location) => {
            resolve(location);
        };

        let onError = () => {
            reject('Unable to get location!!!');
        };

        location.getCurrentPosition(onSuccess, onError);
    });
}