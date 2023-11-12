import ResponseTrait from "../responseTrait.mjs";

import fs from "fs";

import crypto from "crypto";

import multiparty from "multiparty"


export default class AuthController {
    constructor(request, response) {
        this.request = request;
        this.response = response;
        this.responseTrait = new ResponseTrait(request, response);
    }

    login() {
        if (this.request.method !== 'POST') {
            return this.responseTrait.badMethodResponse();
        }
        const form = new multiparty.Form();
        form.parse(this.request, (err, fields) => {
            if(err) {
                return this.responseTrait.apiResponse(500, "An error occurred while processing the form data.");
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
                    return this.responseTrait.apiResponse(500, "Server error.");
                }
    
                fileData = JSON.parse(fileData.toString());
                let userToken = -1;
                fileData.forEach((userData) => {
                    if(userData.username == username && userData.password == crypto.createHash('sha256').update(password).digest('hex')) {
                        if(userData.token) {
                            return this.responseTrait.apiResponse(429,"please logout from other devices before logining in");
                        } else {
                            // store the userToken
                            userToken = crypto.createHash('sha256').update(`${userData.password}${new Date().now}`).digest('hex');
                            userData.token = userToken;
                        }
                    }
                });
                if(userToken != -1) {
                    fs.writeFile("./Users.json", JSON.stringify(fileData), (writeError) => {
                        if (writeError) {
                            return this.responseTrait.apiResponse(500,"an error accorded while trying to login");
                        } else {
                            return this.responseTrait.apiResponse(200, "loggin successeded",{userToken : userToken});
                        }
                    });
                } else {
                    this.responseTrait.apiResponse(400, "wrong cardinalites")
                }
            });


            
        })

    }
    getRegisterForm() {
        if (this.request.method == "GET") {
            readFile('./views/view.html', (err, html) => {
                if (err) {
                    this.responseTrait.apiResponse(500, "an error accored while trying to return the required page");
                } else {
                    this.response.write(html);
                    this.response.end();
                }
            });
        } else {
            this.responseTrait.badMethodResponse();
        }
    }

    register() {
        if (this.request.method !== 'POST') {
            return this.responseTrait.badMethodResponse();
        }
    
        const form = new multiparty.Form();
        const allowedImageFormats = ["image/jpg", "image/jpeg"];
    
        form.parse(this.request, (err, fields, files) => {
            if (err) {
                return this.responseTrait.apiResponse(500, "An error occurred while processing the form data.");
            }
    
            const username = fields["username"] && fields["username"][0];
            const password = fields["password"] && fields["password"][0];
            const profilePicture = files["profile_picture"][0]
    
            if (!username || !password || !profilePicture) {
                return this.responseTrait.apiResponse(400, "Username,password and profile picture  are required.");
            }
    
            if (username.trim() === "" || password.trim().length < 8 || !allowedImageFormats.includes(profilePicture["headers"]["content-type"])) {
                return this.responseTrait.apiResponse(400, "Please enter a valid username, password, and profile picture as jpg or jpeg.");
            }
    
            fs.readFile("./Users.json", (error, fileData) => {
                if (error) {
                    return this.responseTrait.apiResponse(500, "Server error.");
                }
    
                fileData = JSON.parse(fileData.toString());
    
                const doesUserExist = fileData.some(user => user.username === username);
    
                if (doesUserExist) {
                    return this.responseTrait.apiResponse(401, "Username already exists.");
                }
                const imageNewName = `${username}.${profilePicture.headers["content-type"].slice(6)}`

                this.storeUser({ username, password }, fileData, profilePicture, imageNewName)
                    .then((result) => {
                        if (result) {
                            return this.responseTrait.apiResponse(200, "Registered successfully.");
                        } else {
                            return this.responseTrait.apiResponse(500, "An error occurred while trying to save the user.");
                        }
                    });
            });
        });
    }
    
    async storeUser(userData, fileContent, profile_picture, imageNewName) {
        const imageNewPath = `public/profile_pictures/${imageNewName}`;

        return new Promise((resolve) => {
            fs.copyFile(profile_picture.path, imageNewPath, (error) => {
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