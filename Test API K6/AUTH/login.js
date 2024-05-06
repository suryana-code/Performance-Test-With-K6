import http from 'k6/http';
import {check, sleep} from 'k6';

const BASE_URL = 'https://test-api.k6.io';
export let refreshToken = '';


export const options = {
    // vus: 5,
    duration: '2s',
};

export default () => {
    const endpoints = [
        '/auth/token/login/',
    ];
    
    endpoints.forEach(endpoint => {
        if (endpoint === '/auth/token/login/') {

        //Payload for the HTTP POST request
        const payload = {
            "username": "suryana",
            "password": "password"
        };

        //Performs an HTTP POST request with payload
        const url = `${BASE_URL}${endpoint}`;
        const response = http.post(url, JSON.stringify(payload), {
            headers: { 'Content-Type': 'application/json' },
        });

        //Check if the response has status code 201 (Created)
        check(response, {
            [`Status is 200 for ${url}`]: (r) => r.status === 200,
        });
        
            // Parse the response body as JSON
            const responseBody = JSON.parse(response.body);
            refreshToken = responseBody.refresh;

            console.log("Refresh Token:\n", responseBody.refresh, "\n \n \n \n");

            console.log("Access Token:\n", responseBody.access);
        }
    });
sleep(5);
};