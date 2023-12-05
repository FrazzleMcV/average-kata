const {fetchValue} = require("./averageFetch");
const averageStateManager = require("../averageState");
const getAndStoreAverage = async () => {
    try {
        const newValue = await fetchValue();
        console.log(`New value: ${newValue}`)
        averageStateManager.addNewValue(newValue);
    } catch (error) {
        console.error(`Error while fetching value: ${error}`);
    }
}

module.exports = {getAndStoreAverage};