jest.mock('./scheduler');
jest.mock('./dataRetrievalTask');

const {startRetrievingData} = require('.');
const {runSchedule} = require('./scheduler');
const {getAndStoreAverage} = require('./dataRetrievalTask');


describe('startRetrievingData function', () => {
    it('should correctly start retrieving data at an interval', () => {
        startRetrievingData(10);
        expect(runSchedule).toBeCalledWith(getAndStoreAverage, 10000);
    });
});