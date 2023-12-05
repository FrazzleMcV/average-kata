const request = require('supertest');
const BASE_URL = 'http://localhost:9876';
const RUNNING_AVERAGE_ENDPOINT = '/running-average';

const makeGetRequest = async (url, endpoint) => {
    return await request(url).get(endpoint);
}

const testCurrentAverage = (res) => {
    expect(res.statusCode).toEqual(200);
    expect(res.body.currentAverage).toEqual(expect.any(Number));
    expect(res.body.currentAverage).toBeGreaterThan(0);
}

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

describe(RUNNING_AVERAGE_ENDPOINT, () => {
    it('should return current average', async () => {
        const response = await makeGetRequest(BASE_URL, RUNNING_AVERAGE_ENDPOINT);
        testCurrentAverage(response);
    });

    it('should verify current average changes after some seconds', async () => {
        const firstRes = await makeGetRequest(BASE_URL, RUNNING_AVERAGE_ENDPOINT);
        testCurrentAverage(firstRes);

        await wait(3000);

        const secondRes = await makeGetRequest(BASE_URL, RUNNING_AVERAGE_ENDPOINT);
        testCurrentAverage(secondRes);

        expect(secondRes.body.currentAverage).not.toEqual(firstRes.body.currentAverage);
    });
});