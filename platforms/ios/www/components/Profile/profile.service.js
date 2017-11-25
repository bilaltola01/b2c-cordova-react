import { Ajax } from '../../shared/ajax.utils';
import { GeoUtils } from '../../shared/geo-utils.js';

<<<<<<< HEAD
const GOOGLE_GEOLOCATION_API_KEY = 'AIzaSyDktvh7iDvypfc2EcpYmzDvWFyxbHxUWII';
const GOOGLE_GEOLOCATION_OPTIONS = {
    considerIp: true
};

=======
>>>>>>> 527bce22db10fb800e6664a521e2dcd562506bd8
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

        let profiles = res.obj;

        return getProfilesWithGeo(profiles, location);
    });
}

export function getProfilesWithGeo (profiles, location) {
    return (profiles && profiles.length > 0) ?
        (!location) ?
            profiles : profiles.map(company => {
                if (!company.branches || company.branches <= 0) {
                    return company;
                }

                let obj = company;

                let branchesWithDistance = obj.branches.map(branch => {
                    let newBranch = branch;
                    newBranch.Distance = GeoUtils.calculateDistance({
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

<<<<<<< HEAD
function getExternalGeoLocation (options, key) {
    return Ajax().post('https://www.googleapis.com/geolocation/v1/geolocate?key=' + key, {
        body: JSON.stringify(options),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.error) {
            return Promise.reject(res.error);
        }

        let parsed;

        try {
            parsed = JSON.parse(res);

            return Promise.resolve({
                latitude: (parsed.location && parsed.location.lat) ? parsed.location.lat : null,
                longitude: (parsed.location && parsed.location.lng) ? parsed.location.lng : null
            });
        } catch (e) {
            return Promise.reject(e);
        }
    });
}

=======
>>>>>>> 527bce22db10fb800e6664a521e2dcd562506bd8
export function getGeoLocation (location) {
    if (!location) {
        return Promise.reject('ERROR! Geolocation is not available!');
    }

    return new Promise((resolve, reject) => {
        let onSuccess = (location) => {
            resolve(location);
        };

<<<<<<< HEAD
        let onError = (err) => {
            if (err) {
                getExternalGeoLocation(GOOGLE_GEOLOCATION_OPTIONS, GOOGLE_GEOLOCATION_API_KEY).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
            }
        };

        location.getCurrentPosition(onSuccess, onError, {
            maximumAge: 3000,
            timeout: 1000,
            enableHighAccuracy: true
        });
=======
        let onError = () => {
            reject('Unable to get location!!!');
        };

        location.getCurrentPosition(onSuccess, onError);
>>>>>>> 527bce22db10fb800e6664a521e2dcd562506bd8
    });
}