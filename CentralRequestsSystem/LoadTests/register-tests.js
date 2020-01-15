const path = require("./config.json");
const bluebird = require("bluebird")
const request = require("request-promise");
const { PerformanceObserver, performance } = require("perf_hooks");

module.exports = function registerLoadTest(count) {
    let data = [];

    for (i = 10; i < count+10; i++) {
        data.push({
            userAdress: `${i}`,
            identityProviderAdress: `idp${i}`,
            date: "2019-01-15T00:04:26.267Z",
            payload: ""
        });
    }

    const obs = new PerformanceObserver((list) => {
        console.log(list.getEntries()[0].duration / 1000);
        obs.disconnect();
    });
    obs.observe({ entryTypes: ['measure'] });

    performance.mark("start");
    bluebird.map(data, (requestdata) => {
        return request.post({
            uri: `${path.url}/api/requests`,
            body: requestdata,
            json: true
        })
            .catch(err => err);
    }).then(results => {
        performance.mark("end");
        performance.measure("start to end", "start", "end");
    });
}