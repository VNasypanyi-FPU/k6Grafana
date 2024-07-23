/*
 * Config for spring-petclinic app
 */
export const springPetClinicConfig = {
    baseUrl: __ENV.BASE_URL ? __ENV.BASE_URL : 'http://localhost:9966/petclinic'
}

export const springPetClinicStagingConfig = {
    baseUrl: __ENV.BASE_URL ? __ENV.BASE_URL : 'http://staging.com:9966/petclinic'
}