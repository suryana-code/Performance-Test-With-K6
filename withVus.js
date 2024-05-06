//NOTE!!! : K6 Testing with Virtual users and specific duration specified in the script
import http from 'k6/http';
import { sleep } from 'k6';

//Test configuration
export const options = {
  vus: 10,             //Virtual-Users (VUs)
  duration: '10s',     //Total test duration
  thresholds: {
    http_req_duration: ["p(99)<4000"], //99% of requests must be completed in less than the specified time (/ms)
  },
};

//main fungtion
export default function () {
  http.get('http://test.k6.io');  //get url
  sleep(1);                       //sleep execution
}
