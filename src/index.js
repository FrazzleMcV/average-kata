const router = require('./router');
const dataRetriever = require('./service/dataRetriever');

const PORT = 9876;
const FETCH_INTERVAL_IN_SECONDS = 1;
const initialise = (port) => {
    const app = router.createServer(port);
    router.setupRoutes(app);

    dataRetriever.startRetrievingData(FETCH_INTERVAL_IN_SECONDS);
}

initialise(PORT);