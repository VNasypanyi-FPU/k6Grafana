import { vetFlow, ownerPetFlow } from './flows.js';
import { group } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';

const rampUpDuration = __ENV.RAMP_UP_DURATION ? __ENV.RAMP_UP_DURATION : '60s';
const duration = __ENV.CUSTOM_DURATION ? __ENV.CUSTOM_DURATION : '600s';
const rampDownDuration = __ENV.RAMP_DOWN_DURATION ? __ENV.RAMP_DOWN_DURATION : '0s';
const targetRate = __ENV.CUSTOM_TARGET_RATE ? __ENV.CUSTOM_TARGET_RATE : 10;
const preAllocatedVUs = __ENV.PREALLOCATED_VUS ? __ENV.PREALLOCATED_VUS : 50;

export const options = {
    scenarios: {
        ownerPetLoadTest: {
            executor: 'ramping-arrival-rate',
            exec: "ownerPetLoadTest",
            timeUnit: '1s',
            startRate: 0,
            preAllocatedVUs: preAllocatedVUs,
            stages: [
                { target: targetRate, duration: rampUpDuration }, // ramp-up phase
                { target: targetRate, duration: duration },       // main test phase
                { target: 0, duration: rampDownDuration }         // optional ramp-down
            ]
        },
        vetBaselineLoad: {
            executor: 'ramping-arrival-rate',
            exec: "vetBaselineLoad",
            timeUnit: '1s',
            startRate: 0,
            preAllocatedVUs: 10,
            stages: [
                // VUs rate value not overriden by env vars, since we don't need that in baseline load
                { target: 2, duration: rampUpDuration },          // ramp-up phase
                { target: 2, duration: duration },                // main test phase
                { target: 0, duration: rampDownDuration }         // optional ramp-down
            ]
        }
    }
}

export function ownerPetLoadTest() {
    group('Petclinic load test', function () {
        ownerPetFlow();
    });
}

export function vetBaselineLoad() {
    group('Petclinic vet baseline load', function () {
        vetFlow();
    });
}

export function handleSummary(data) {
    return {
        'stdout': textSummary(data, { indent: '  ', enableColors: true }),
        'summary.json': JSON.stringify(data)
    };
}
