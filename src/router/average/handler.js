const { getAverage } = require('../../service/averageState');

const fetchRunningAverage = async (req, res) => {
    try {
        const currentAverage = getAverage();
        res.json({ currentAverage });
    } catch (error) {
        res.status(500).json({
            error: 'A server error occurred while calculating the average'
        });
    }
}

module.exports = { fetchRunningAverage };