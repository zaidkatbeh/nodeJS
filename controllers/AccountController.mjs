import ResponseTrait from "../responseTrait.mjs";

import fs from "fs";

import crypto from "crypto";

import multiparty from "multiparty"
import AuthMiddleware from "../middlewares/AuthMiddleware.mjs";


export default class AccountController {
    constructor(request, response) {
        this.request = request;
        this.response = response;
        this.responseTrait = new ResponseTrait(request, response);
    }

    login() {
        if (this.request.method !== 'POST') {
            return this.responseTrait.badMethodResponse();
        }
        const FORM = new multiparty.Form();
        FORM.parse(this.request, (err, fields) => {
            if (err) {
                return this.responseTrait.serverErrorResponse("An error occurred while processing the form data.");
            }
            const username = fields["username"] && fields["username"][0];
            const password = fields["password"] && fields["password"][0];

            if (!username || !password) {
                return this.responseTrait.apiResponse(400, "Username and password both are required.");
            }

            if (username.trim() === "" || password.trim().length < 8) {
                return this.responseTrait.apiResponse(400, "Please enter a valid username and password");
            }

            fs.readFile("./Users.json", (error, fileData) => {
                if (error) {
                    return this.responseTrait.serverErrorResponse("Server error.");
                }

                fileData = JSON.parse(fileData.toString());
                let userToken = -1;
                fileData.forEach((userData) => {
                    if (userData.username == username && userData.password == crypto.createHash('sha256').update(password).digest('hex')) {
                        if (userData.token) {
                            userToken = 0;
                        } else {
                            // store the userToken
                            userToken = crypto.createHash('sha256').update(`${userData.password}${new Date().now}`).digest('hex');
                            userData.token = userToken;
                        }
                    }
                });

                if (userToken == -1) {
                    this.responseTrait.apiResponse(400, "wrong cardinalites")

                } else if (userToken == 0) {
                    this.responseTrait.apiResponse(429, "please logout from other devices before logining in");
                }
                else {
                    fs.writeFile("./Users.json", JSON.stringify(fileData), (writeError) => {
                        if (writeError) {
                            return this.responseTrait.serverErrorResponse("an error accorded while trying to login");
                        } else {
                            return this.responseTrait.apiResponse(200, "loggin successeded", { userToken: userToken });
                        }
                    });
                }
            });
        });

    }

    logout() {
        if (this.request.method != "POST") {
            return this.responseTrait.badMethodResponse();
        }

        const authHeader = this.request.headers.authorization && this.request.headers.authorization.slice(7);
        if (!authHeader) {
            return this.responseTrait.unautharizedResponse();
        }

            fs.readFile("./Users.json", (error, fileData) => {
                if (error) {
                    return this.responseTrait.serverErrorResponse("Server error.");
                }

                fileData = JSON.parse(fileData.toString());
                fileData.forEach(user => {
                    if(user.token == authHeader) {
                        delete user.token;
                        return;
                    } else {
                        console.log(user.token);
                        console.log(authHeader);
                    }
                });

                fs.writeFile("./Users.json", JSON.stringify(fileData), error =>{
                    if(error) {
                        return this.responseTrait.serverErrorResponse("an error accorded whilte trying to logout");
                    } else {
                        // note {i know i didnt check if the token does not exist, its not a bug ;) }
                        return this.responseTrait.apiResponse(200,"logged out successfuly");
                    }
                });
            });
    }

    getRegisterForm() {
        if (this.request.method == "GET") {
            readFile('./views/view.html', (error, html) => {
                if (error) {
                    this.responseTrait.serverErrorResponse("an error accored while trying to return the required page");
                } else {
                    this.response.write(html);
                    this.response.end();
                }
            });
        } else {
            this.responseTrait.badMethodResponse();
        }
    }

    async edit() {
        if((await AuthMiddleware(this.request, this.response)) != undefined) {
            console.log(this.request.user);
            console.log("-".repeat(20));
            return this.responseTrait.apiResponse(200,"",this.request.user?"hi":"not hi")
        }
    }

    register() {
        if (this.request.method !== 'POST') {
            return this.responseTrait.badMethodResponse();
        }

        const FORM = new multiparty.Form();
        const ALLOWEDIMAGEFORMATS = ["image/jpg", "image/jpeg"];

        FORM.parse(this.request, (error, fields, files) => {
            if (error) {
                return this.responseTrait.serverErrorResponse("An error occurred while processing the form data.");
            }

            const USERNAME = fields["username"] && fields["username"][0];
            const PASSWORD = fields["password"] && fields["password"][0];
            const PROFILE_PICTURE = files["profile_picture"] && files["profile_picture"][0];

            if (!USERNAME || !PASSWORD || !PROFILE_PICTURE) {
                return this.responseTrait.apiResponse(400, "Username,password and profile picture  are required.");
            }

            if (USERNAME.trim() === "" || PASSWORD.trim().length < 8 || !ALLOWEDIMAGEFORMATS.includes(PROFILE_PICTURE["headers"]["content-type"])) {
                return this.responseTrait.apiResponse(400, "Please enter a valid username, password, and profile picture as jpg or jpeg.");
            }

            fs.readFile("./Users.json", (error, fileData) => {
                if (error) {
                    return this.responseTrait.serverErrorResponse("Server error.");
                }

                fileData = JSON.parse(fileData.toString());

                if (fileData.some(user => user.username === USERNAME)) {
                    return this.responseTrait.apiResponse(401, "Username already exists.");
                }

                const IMAGE_NEW_NAME = `${USERNAME}.${PROFILE_PICTURE.headers["content-type"].slice(6)}`

                this.storeUser({username : USERNAME, password : PASSWORD }, fileData, PROFILE_PICTURE, IMAGE_NEW_NAME)
                    .then((result) => {
                        if (result) {
                            return this.responseTrait.apiResponse(200, "Registered successfully.");
                        } else {
                            return this.responseTrait.serverErrorResponse("An error occurred while trying to save the user.");
                        }
                    });
            });
        });
    }

    async storeUser(userData, fileContent, profile_picture, imageNewName) {
        const IMAGE_NEW_PATH = `public/profile_pictures/${imageNewName}`;

        return new Promise((resolve) => {
            fs.copyFile(profile_picture.path, IMAGE_NEW_PATH, (error) => {
                if (error) {
                    console.log("Error copying profile picture:", error);
                    resolve(false);
                } else {
                    const hashedPassword = crypto.createHash('sha256').update(userData.password).digest('hex');
                    fileContent.push({
                        username: userData.username,
                        password: hashedPassword,
                        profile_picture: imageNewName,
                    });

                    fs.writeFile("./Users.json", JSON.stringify(fileContent), (writeError) => {
                        if (writeError) {
                            console.log("Error writing to Users.json:", writeError);
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    });
                }
            });
        });
    }
}