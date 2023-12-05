let state = {average: 0, count: 0};

const addNewValue = (value) => {
    state = {
        average: ((state.average * state.count) + value) / (state.count + 1),
        count: state.count + 1
    }
}

const getAverage = () => state.average;
const reset = () => state = {average: 0, count: 0};

module.exports = {addNewValue, getAverage, reset};