import http from 'k6/http';
import { sleep, check } from 'k6';

// Konfigurasi pengujian
export const options = {
    stages: [
        { duration: '30s', target: 20 },
        { duration: '1m30s', target: 10 },
        { duration: '20s', target: 0 },
    ],
};
   
// Fungsi utama pengujian
export default function () {
    const res = http.get('https://httpbin.test.k6.io/bearer');
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
}
  