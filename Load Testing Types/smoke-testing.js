//!!!NOTE : Smoke test to validate the script whether it works or not with minimal load
import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'https://test-api.k6.io';

export const options = {
  vus: 5,
  duration: '30s',
};

export default () => {
  const endpoints = [
    '/public/crocodiles/',
    '/user/register/',
  ];

  //Iterate through each endpoint and perform an HTTP GET or POST request
  endpoints.forEach(endpoint => {
    if (endpoint === '/user/register/') {
      const payload = {
        username: generateRandomString(),
        first_name: generateRandomString(),
        last_name: generateRandomString(),
        email: generateRandomEmail(),
        password: generateRandomString(),
      };

      //Performs an HTTP POST request with payload
      const url = `${BASE_URL}${endpoint}`;
      const response = http.post(url, JSON.stringify(payload), {
        headers: { 'Content-Type': 'application/json' },
      });

      //Checks if the response has status code 201 (Created)
      check(response, {
        [`Status is 201 for ${url}`]: (r) => r.status === 201,
      });
    } else {
      //Perform an HTTP GET request for another endpoint
      const url = `${BASE_URL}${endpoint}`;
      const response = http.get(url);

      //Check whether the response has status code 200 (OK)
      check(response, {
        [`Status is 200 for ${url}`]: (r) => r.status === 200,
      });
    }

    sleep(1);
  });
};


//Generate a random string
function generateRandomString() {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

//Create a random email
function generateRandomEmail() {
  return `${generateRandomString()}@example.com`;
}
