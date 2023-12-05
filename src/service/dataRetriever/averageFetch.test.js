const { fetchValue } = require('./averageFetch');
global.fetch = jest.fn();

const mockFetchResponse = response => fetch.mockResolvedValue({ json: () => Promise.resolve(response) });

const SUCCESS_RESPONSE = [{ status: 'success', random: 42 }];
const FAILURE_RESPONSE = [{ status: 'failure', reason: 'Test error' }];

describe('fetchAverage', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('returns a random number on success', async () => {
        mockFetchResponse(SUCCESS_RESPONSE);

        const result = await fetchValue();
        expect(result).toBe(42);
    });

    it('throws an error on failure', async () => {
        mockFetchResponse(FAILURE_RESPONSE);

        await expect(fetchValue()).rejects.toThrow(new Error('Could not fetch average: Test error'));
    });
});