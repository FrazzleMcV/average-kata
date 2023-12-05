const runSchedule = (task, interval) => {
    // Taking into account the time it takes to execute the task
    // https://developer.mozilla.org/en-US/docs/Web/API/setInterval#ensure_that_execution_duration_is_shorter_than_interval_frequency
    const repeatTask = async () => {
        await task();
        setTimeout(repeatTask, interval);
    };

    repeatTask();
}

module.exports = { runSchedule };