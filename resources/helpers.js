import { fail } from 'k6';

/*
 * Function for resolution of placeholders
 * in json payload templates.
 * Placeholders should have format: {{name}}
 */
export function resolvePlaceholders(template, data) {
    return template.replace(/{{(\w+)}}/g, (match, key) => {
        return data[key] || match;
    });
}

/*
 * Handle unexpected responses
 */
export function handleError(endpoint, statusCode) {
    fail(`Request on endpoint: ${endpoint} failed with status code: ${statusCode}`);
}
