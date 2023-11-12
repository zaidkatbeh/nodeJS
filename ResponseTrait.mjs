export default class ResponseTrait {
    constructor (request, response) {
        this.request = request;
        this.response = response;
    }
    apiResponse(statusCode, message,data) {
        this.response.setHeader("Content-Type","application/json");
        this.response.statusCode = statusCode;
        this.response.end(JSON.stringify({
            message : message,
            data : data
        }));
    }
    badMethodResponse() {
        this.response.setHeader("Content-Type","application/json");
        this.apiResponse(405,"this method is not allowed");
    }
}