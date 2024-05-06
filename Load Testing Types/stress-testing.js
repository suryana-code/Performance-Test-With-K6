//!!!NOTE: to perform performance testing with loads exceeding the specified average
import http from 'k6/http';
import { sleep, check } from 'k6';

const BASE_URL = 'https://test-api.k6.io';
const endpoints = [
  '/public/crocodiles/',
  '/public/crocodiles/2/',
];

export const options = {
  stages: [
    { duration: '3s', target: 50 },
    { duration: '5s', target: 50 },
    { duration: '1s', target: 0 },
  ],
};

export default () => {
  for (let i = 0; i < endpoints.length; i++) {
    const endpoint = endpoints[i];
    const url = `${BASE_URL}${endpoint}`;
    const response = http.get(url);

  //Check whether the response has status code 200 (OK)
  check(response, {
    [`Status is 200 for ${url}`]: (r) => r.status === 200,
  });

  sleep(1);
  };
};