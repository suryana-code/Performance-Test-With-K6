//"username": "suryana", "first_name": "suryana", "last_name": "qa", "email": "suryana@topindoku.co.id"
import http from 'k6/http';
import {check, sleep} from 'k6';

const BASE_URL = 'https://test-api.k6.io';


//An array containing a list of first names
const firstNames = ['John', 'Jonat', 'Usman', 'Emma', 'Michael', 'Sophia', 'William', 'Olivia', 'James', 'Ava', 'Daniel', 'Isabella', 'Ahmad', 'Siti', 'Mohammad', 'Rina', 'Dewi', 'Asep', 'Yuli', 'Nur', 'Eka', 'Putri', 'Iwan', 'Rudi'];

//An array containing a list of last names
const lastNames = ['Boot', 'Luman', 'Abri', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];

//Test configuration
export const options = {
    vus: 5,
    duration: '2s',
};


export default () => {
    const endpoints = [
        '/user/register/',
    ];

    endpoints.forEach(endpoint => {
        if (endpoint === '/user/register/') {
            //Picks a random first name from the First Names array
            const randomFirstIndex = Math.floor(Math.random() * firstNames.length);
            const randomFirstName = firstNames[randomFirstIndex];

            //Picks a random last name from the First Names array
            const randomLastIndex = Math.floor(Math.random() * lastNames.length);
            const randomLastName = lastNames[randomLastIndex];

            //Combine the first and last name to form a full name without spaces
            const randomFullName = `${randomFirstName}${randomLastName}${Math.floor(Math.random() * 100)}`.trim();

            //Payload for the HTTP POST request
            const payload = {
                username: randomFullName,
                first_name: randomFirstName,
                last_name: randomLastName,
                email: generateRandomEmail(),
                password: 'password123'

            };

            //Performs an HTTP POST request with payload
            const url = `${BASE_URL}${endpoint}`;
            const response = http.post(url, JSON.stringify(payload), {
                headers: { 'Content-Type': 'application/json' },
            });

            //Check if the response has status code 201 (Created)
            check(response, {
                [`Status is 201 for ${url}`]: (r) => r.status === 201,
            });
            
            console.log("Response body : ", response.body);
        }
    });
    sleep(5);
};

//Generate random email
function generateRandomEmail() {
    const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
        result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return `${result}@example.com`;
}
