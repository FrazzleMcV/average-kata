const {runSchedule} = require('./scheduler');
const { getAndStoreAverage } = require('./dataRetrievalTask');
const startRetrievingData = (intervalInSeconds) => {
    runSchedule(getAndStoreAverage, intervalInSeconds * 1000);
}

module.exports = {startRetrievingData};
