import { springPetClinicConfig } from '../../config.js'
import { listOwners, postOwner } from "../../steps/spring-petclinic/owners/owners-steps.js";
import { listVets } from "../../steps/spring-petclinic/vets/vets-steps.js"
import { group } from "k6";
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

const baseUrl = springPetClinicConfig.baseUrl;

export function vetFlow() {
    group('Check list of vets, ...', function () {
        listVets(baseUrl);
        // add steps
    });
}

export function ownerPetFlow() {
    const owner = {
        firstName: randomString(8),
        lastName: randomString(8),
        address: randomString(16),
        city: randomString(10),
        telephone: randomString(10, `0123456789`)
    }

    group('Check list of owners, ...', function () {
        listOwners(baseUrl);
        postOwner(baseUrl, owner);
    });
}
