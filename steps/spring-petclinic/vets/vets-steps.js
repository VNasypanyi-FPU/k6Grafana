import http from 'k6/http';
import { check, group } from 'k6';
import { handleError } from '../../../resources/helpers.js';
import { Trend } from 'k6/metrics';

const TrendListVetsRTT = new Trend('ListVetsRTT', true);

/*
 * Get list of vets
 */
export function listVets(baseUrl) {
    const endpoint = "/api/vets";
    const url = baseUrl + endpoint;
    
    group('List vets', () => {
        const res = http.get(url, {
            tags: { type: 'GET vets' }
        });
        let status = check(res, {
            "Vet list returned.": (r) => r.status === 200
        });
        if (!status) {
            handleError(endpoint, res.status);
        };
        TrendListVetsRTT.add(res.timings.duration);
    });
}
