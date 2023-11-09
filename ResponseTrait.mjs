export default class ResponseTrait {
    constructor (request, response) {
        this.request = request;
        this.response = response;
    }
    apiResponse(statusCode, message) {
        this.response.setHeader("Content-Type","application/json");
        this.response.statusCode = statusCode;
        this.response.end(JSON.stringify({message:message}));
    }
    badMethodResponse() {
        this.response.setHeader("Content-Type","application/json");
        this.apiResponse(405,"this method is not allowed");
    }
}