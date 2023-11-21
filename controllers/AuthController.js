import ResponseTrait from "../responseTrait.js";

import fs from "fs";

import crypto from "crypto";

import User from "../models/User.js";

export default class AuthController {
    constructor(request, response) {
        this.request = request;
        this.response = response;
        this.responseTrait = new ResponseTrait(request, response);
    }

    async login() {
        if (this.request.method !== 'POST') {
            return this.responseTrait.badMethodResponse();
        }

        const username = this.request.fields["username"] && this.request.fields["username"][0];
        const password = this.request.fields["password"] && this.request.fields["password"][0];

        if (!username || !password) {
            return this.responseTrait.apiResponse(400, "Username and password both are required.");
        }

        if (username.trim() === "" || password.trim().length < 8) {
            return this.responseTrait.apiResponse(400, "Please enter a valid username and password");
        }

        new Promise(async (resolve) => {
            let users = await User.getUsers();
            resolve(users);
        }).then(users => {
            for (const userData of users) {
                if (userData.username == username && userData.password == crypto.createHash('sha256').update(password).digest('hex')) {
                    if (userData.token) {
                        console.log("please logout from other devices before logining in");
                        throw new Error("please logout from other devices before logining in");
                    } else {
                        // store the userToken
                        let userToken = crypto.createHash('sha256').update(`${userData.password}${new Date().now}`).digest('hex');
                        userData.token = userToken;
                        return [users, userToken];
                    }
                }
            }
            throw new Error("wrong cardinalites");
        }).then(([usersAfterUpdate, authToken]) => {
            User.writeUsers(usersAfterUpdate);
            return (authToken);
        }).then((authToken) => {
            this.responseTrait.apiResponse(200, "loggin successeded", { "Auth token": authToken });
        }).catch(error => {
            console.log(error);
            this.responseTrait.serverErrorResponse(error.message)
        });
    }

    async logout() {
        if (this.request.method != "POST") {
            return this.responseTrait.badMethodResponse();
        }
        try {
            const USERS = await User.getUsers();
            USERS.forEach(user => {
                if (user.token == this.request.user.token) {
                    delete user.token;
                    return;
                }
            });
            await User.writeUsers(USERS);
            this.responseTrait.apiResponse(200, "logged out successfuly")
        } catch (error) {
            this.responseTrait.serverErrorResponse(error.message)
        }
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

    async register() {
        if (this.request.method !== 'POST') {
            return this.responseTrait.badMethodResponse();
        }

        const ALLOWEDIMAGEFORMATS = ["image/jpg", "image/jpeg", "image/png"];
        const USERNAME = this.request.fields["username"] && this.request.fields["username"][0];
        const PASSWORD = this.request.fields["password"] && this.request.fields["password"][0];
        const PROFILE_PICTURE = this.request.files["profile_picture"] && this.request.files["profile_picture"][0];

        if (!USERNAME || !PASSWORD || !PROFILE_PICTURE) {
            return this.responseTrait.apiResponse(400, "Username,password and profile picture  are required.");
        }

        if (USERNAME.trim() === "" || PASSWORD.trim().length < 8 || !ALLOWEDIMAGEFORMATS.includes(PROFILE_PICTURE["headers"]["content-type"])) {
            return this.responseTrait.apiResponse(400, "Please enter a valid username, password, and profile picture as jpg or jpeg.");
        }
        try {
            const USERS = await User.getUsers();
            if (USERS.some(user => user.username === USERNAME)) {
                return this.responseTrait.apiResponse(401, "Username already exists.");
            }

            const IMAGE_NEW_NAME = `${USERNAME}.${PROFILE_PICTURE.headers["content-type"].slice(6)}`
            const IMAGE_NEW_PATH = `public/profile_pictures/${IMAGE_NEW_NAME}`;

            fs.copyFile(PROFILE_PICTURE.path, IMAGE_NEW_PATH, (error) => {
                if (error) {
                    console.log("Error copying profile picture:", error);
                    throw new Error("an error accorded while trying to save your image")
                } else {
                    const hashedPassword = crypto.createHash('sha256').update(PASSWORD).digest('hex');
                    USERS.push({
                        username: USERNAME,
                        password: hashedPassword,
                        profile_picture: IMAGE_NEW_NAME,
                    });
                    User.writeUsers(USERS);
                }
            });
        } catch (error) {
            this.responseTrait.badMethodResponse(error)
        }
    }
}