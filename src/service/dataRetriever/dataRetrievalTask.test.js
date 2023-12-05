const {getAndStoreAverage} = require('./dataRetrievalTask');
const {fetchValue} = require('./averageFetch');
const averageStateManager = require('../averageState');

jest.mock('./averageFetch');
jest.mock('../averageState');

describe('getAndStoreAverage function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('fetches a new value and adds it to the average state manager', async () => {
        fetchValue.mockResolvedValue(42);

        await getAndStoreAverage();

        expect(fetchValue).toHaveBeenCalledTimes(1);
        expect(averageStateManager.addNewValue).toHaveBeenCalledWith(42);
    });

    it('should handle fetch errors properly', async () => {
        const testError = new Error('Test error');
        fetchValue.mockRejectedValue(testError);

        console.error = jest.fn();  // Spy on console.error

        await getAndStoreAverage();

        expect(fetchValue).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith(`Error while fetching value: ${testError.toString()}`);
        expect(averageStateManager.addNewValue).not.toBeCalled(); // Ensure it wasn't called
    });


});