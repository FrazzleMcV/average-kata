const { addNewValue, getAverage, reset } = require('.');

const addMultipleValues = (values) => values.forEach(value => addNewValue(value));

describe('Average state manager', () => {
    beforeEach(() => reset()); // Ensure a clean state for each test

    test('should return correct average when adding multiple items', () => {
        addMultipleValues([2,3,4]);
        expect(getAverage()).toBeCloseTo(3);
    });

    test('should return correct average when adding a single item', () => {
        addNewValue(7);
        expect(getAverage()).toBe(7);
    });

    test('should return zero when no items are added', () => {
        expect(getAverage()).toBe(0);
    });
});