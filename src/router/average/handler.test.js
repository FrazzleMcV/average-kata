const {fetchRunningAverage} = require("./handler");
const {getAverage} = require("../../service/averageState");
const httpMocks = require("node-mocks-http");

jest.mock("../../service/averageState");

describe("fetchRunningAverage", () => {
    const setupMocks = () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const jsonSpy = jest.spyOn(res, "json");
        return {req, res, jsonSpy};
    }

    it("should respond with the current average", async () => {
        getAverage.mockImplementation(() => 5.5);
        const {req, res, jsonSpy} = setupMocks();

        await fetchRunningAverage(req, res);

        expect(jsonSpy).toHaveBeenCalledWith({currentAverage: 5.5});
    });

    it("should respond with a 500 status on an error", async () => {
        getAverage.mockImplementation(() => {
            throw new Error()
        });
        const {req, res, jsonSpy} = setupMocks();
        const statusSpy = jest.spyOn(res, "status").mockImplementation(() => res);

        await fetchRunningAverage(req, res);

        expect(statusSpy).toHaveBeenCalledWith(500);
        expect(jsonSpy).toHaveBeenCalledWith({error: 'A server error occurred while calculating the average'});
    });
});