import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'; //for generate report.html

export const options = {
    vus:10, //Virtual users
    duration: '10s', //total run time

};
export default function () {
    http.get('http://test.k6.io');  //get url
    sleep(1);                       //sleep execution

}

export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
    }
}

//'k6 run generate-html-report.js --out json=test.json' for run & generate report.html