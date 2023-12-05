const express = require("express");
const averageRouter = require("./average");

const createServer = port => {
    const app = express();
    app.listen(port, () => console.log(`Server started on port: ${port}`));
    return app;
}

const setupRoutes = app => {
    app.use(averageRouter);
}

module.exports = { createServer, setupRoutes };