import http from 'k6/http';
import { check, group } from 'k6';
import { handleError } from '../../../resources/helpers.js';
import { ownerPayload } from '../../../resources/payloads/spring-petclinic/ownerPayload.js';
import { Trend } from 'k6/metrics';

export const TrendListOwnersRTT = new Trend('ListOwnersRTT', true);
export const TrendPostOwnerRTT = new Trend('PostOwnerRTT', true);

/*
 * Get list of owners
 */
export function listOwners(baseUrl) {
    const endpoint = '/api/owners';
    const url = baseUrl + endpoint;

    group('List owners', () => {
        const res = http.get(url, {
            tags: { type: 'GET owners' }
        });
        let status = check(res, {
            "Owner list returned.": (r) => r.status === 200
        });
        if (!status) {
            handleError(endpoint, res.status);
        }
        TrendListOwnersRTT.add(res.timings.duration);
    });
}

export function postOwner(baseUrl, owner) {
    const endpoint = '/api/owners';
    const url = baseUrl + endpoint;
    const payload = ownerPayload(owner);

    group('Post owner', () => {
        const res = http.post(url, JSON.stringify(payload), {
            tags: { type: 'GET owners' },
            headers: {"Content-Type": "application/json", "Accept": "application/json"}
        });
        let status = check(res, {
            "Owner created.": (r) => r.status === 201
        });
        if (!status) {
            handleError(endpoint, res.status);
        }
        TrendPostOwnerRTT.add(res.timings.duration);
    });
}
