export function ownerPayload(owner) {
    let payload = {
        "firstName": owner.firstName,
        "lastName": owner.lastName,
        "address": owner.address,
        "city": owner.city,
        "telephone": owner.telephone
    }
    return payload;
}
