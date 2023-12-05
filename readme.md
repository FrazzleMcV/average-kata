
### Running the app
1. Run `npm install`
2. Run `npm start`
3. The endpoint can be accessed at `http://localhost:9876/running-average`

### Running the tests

Unit tests can be run with `npm test`

A smoke test can be run with `npm run run-smoke-test` this start a server and runs tests against the endpoint.
NB: This makes use of `sleep` which is not available on windows. If you are running on windows you can run the server and tests separately with `npm run start-server` and `npm run smoke-test`

### Design decisions

The main focus was on small testable elements that could be composed together.

The state is stored as a singleton that can be modified by the `addNewValue` function. 
In its current form changes should be atomic given that the state us updated in a single function call meaning the state is updated in a single loop of the event loop.
This is further enforced by the rate limiting of the scheduler. 

The average is calculated on each call to `addNewValue` and is stored in the state. 
This means that the average is always up to date and does not need to be calculated on each call to the endpoint.
This also means that we are not storing a potentially infinite list of values in memory.

It potentially made sense to have the singleton state be a class, but I decided to keep it as a plain object for simplicity and consistency with the rest of the code which is in less of an object oriented style.

The scheduler proved difficult to test at it made use of `setInterval` and `async` calls which were not easily mocked. 
The advantage of this tradeoff is that the scheduler ensures that only a single call is made to the random endpoint at a time, as the scheduler is only called once the previous call has completed.
This means that if the endpoint itself is slow to respond the scheduler will not queue up multiple calls to the endpoint. 
If this was not appropriate or did not meet the spec correctly my next port of call would be to pull in a well tested library that could handle this for me and be easily mocked.