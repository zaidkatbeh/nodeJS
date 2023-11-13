import ResponseTrait from "../responseTrait.mjs";

import AuthMiddleware from "../middlewares/AuthMiddleware.mjs";

import multiparty from "multiparty";

import fs from "fs";

export default class AccountController {
    constructor(request, response) {
        this.request = request;
        this.response = response;
        this.responseTrait = new ResponseTrait(request, response);
        console.log('-'.repeat(20));
    }
    edit() {
        if (this.request.method !== 'POST') {
            return this.responseTrait.badMethodResponse();
        }
        const FORM = new multiparty.Form();
        FORM.parse(this.request, (err, fields, files) => {
            if (err) {
                return this.responseTrait.serverErrorResponse("An error occurred while processing the form data.");
            }

            const PROFILE_PICTURE = files["profile_picture"] && files["profile_picture"][0];
            if(!PROFILE_PICTURE ) {
                return this.responseTrait.apiResponse(400,"please submit some data");
            }
            readFile("./Users.json", (error, users) => {
                if(error) {
                    return this.responseTrait.serverErrorResponse("an error accorded while geting the user info");
                }
                
                users = JSON.parse(users);
                const IMAGE_NEW_NAME = `${this.request.user.username}.${PROFILE_PICTURE.headers["content-type"].slice(6)}`
                if(PROFILE_PICTURE) {
                    fs.unlink(`public/profile_pictures/${this.request.user["profile_picture"]}`,(error) => {
                        if(error) {
                            return this.responseTrait.serverErrorResponse("an error accorded please try again later");
                        }

                        fs.copyFile(PROFILE_PICTURE.path, `public/profile_pictures/${IMAGE_NEW_NAME}`,(error) => {
                            if(error) {
                                return this.responseTrait.serverErrorResponse("an error accorded please try again later");
                            }
                            users.map((user) => {
                                if(user.username == this.request.user.username) {
                                    user.profile_picture = IMAGE_NEW_NAME;
                                }
                            });
                            return this.responseTrait.apiResponse(200,"user edited successfuly");
                        })
                    });
                }
            })

        })
    }
}