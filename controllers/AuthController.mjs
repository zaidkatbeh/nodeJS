import ResponseTrait from "../responseTrait.mjs";
import querystring from "querystring";

export default class AuthController {
    constructor(request, response) {
        this.request = request;
        this.response = response;
        this.responseTrait = new ResponseTrait(request, response)
    }
    getRegisterForm() {
        if (this.request.method == "GET") {
            readFile('./views/view.html', (err, html) => {
                if (err) {
                    this.responseTrait.apiResponse(500, "an error accored while trying to return the required page");
                }
                this.response.write(html);
                this.response.end();
            });
        } else {
            this.responseTrait.badMethodResponse();
        }
    }

    register() {
        if (this.request.method == "POST") {
            let body = "";
            this.request.on('data', data => {
                body += data;
            });
            console.log("-".repeat(20));
            this.request.on('end', () => {
                const data = querystring.parse(body);
                    if(!data["username"] || !data["passowrd"]) {
                        return this.responseTrait.apiResponse(400,"username and password are both required");
                    }
                    if (data["username"].trim() != "" && data["password"].trim().length >= 8) {
                        return this.responseTrait.apiResponse(200,"registerd successfult");
                    } else {
                        return this.responseTrait.apiResponse(400,"please enter valid username and password");
                    }
            });
        } else {
            this.badMethodResponse();
        }
    }
}