import { Ajax } from '../../shared/ajax.utils';

export default function pushAnalytics(obj, dbObj) {
    window.dataLayer.push(obj);
    pushDatabaseAnalytics(dbObj);
};

export function pushDatabaseAnalytics(obj) {
    return Ajax().post('/analytics', {
        body: JSON.stringify(obj),
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache"
        }
    }).then((res) => {
        if (!res || !res.success) {
            return Promise.reject(res);
        }
    }).catch((err) => {
        console.error(err);
    });
};