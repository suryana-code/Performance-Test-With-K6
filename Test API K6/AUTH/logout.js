import http from 'k6/http';
import { check, sleep } from 'k6';
import { refreshToken } from './login.js';

const BASE_URL = 'https://test-api.k6.io';

export const options = {
    // vus: 5,
    duration: '2s',
};

export default () => {
    const endpoint = '/auth/cookie/logout/';

    // Set the refresh token content as a cookie
    const cookies = {
        refresh: refreshToken,
    };

    // Perform an HTTP GET request with cookies
    const url = `${BASE_URL}${endpoint}`;
    const response = http.post(url, { cookies });

    // Check if the response has status code 200 (OK)
    check(response, {
        [`Status is 200 for ${url}`]: (r) => r.status === 200,
    });
    
    sleep(5);
};
