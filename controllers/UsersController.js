import ResponseTrait from "../responseTrait.js";

import fs from "fs";

export default class UsersController {
    constructor(request, response) {
        this.request = request;
        this.response = response;
        this.responseTrait = new ResponseTrait(request, response);
    }
    getAll() {
        fs.readFile("./Users.json", (error, fileData) => {
            if (error) {
                return this.responseTrait.serverErrorResponse("Server error.");
            }
            return this.responseTrait.apiResponse(200, "", JSON.parse(fileData))
        });
    }
}