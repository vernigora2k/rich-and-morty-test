import { apiRequest } from './apiClient';

export function getData(url) {
    return apiRequest('GET', url)
        .then()
        .catch(error => console.log(error))
}