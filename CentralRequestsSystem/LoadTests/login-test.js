const path = require("./config.json");
const bluebird = require("bluebird")
const request = require("request-promise");
const { PerformanceObserver, performance } = require("perf_hooks");

const requestNames = ["user", "idp", "wronguser"];
const requestPasswords = ["123", "ehe", "fdf"];

module.exports = function loginLoadTest(count) {
    let data = [];

    for (i = 0; i < count; i++) {
        nameid = Math.floor(Math.random() * 2);
        passid = Math.floor(Math.random() * 2);
        data.push({ name: requestNames[nameid], pass: requestPasswords[passid] });
    }

    const obs = new PerformanceObserver((list) => {
        console.log(list.getEntries()[0].duration/1000);
        obs.disconnect();
    });
    obs.observe({ entryTypes: ['measure'] });

    performance.mark("start");
    bluebird.map(data, (loginInfo) => {
        return request.get(`${path.url}/api/login?username=${loginInfo.name}&password=${loginInfo.pass}`)
            .catch(err => err);
    }).then(results => {
        performance.mark("end");
        performance.measure("start to end", "start", "end");
    });
}