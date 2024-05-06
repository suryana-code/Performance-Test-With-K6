//NOTE!!! : simple K6 test example, just accessing a url
import http from 'k6/http';
import { sleep } from 'k6';

//main function
export default function () {
  http.get('http://test.k6.io');  //get url
  sleep(1);                       //sleep execution
}
