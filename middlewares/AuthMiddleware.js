import ResponseTrait from "../responseTrait.mjs";

export default async function  AuthMiddleware (request, response, callback){
    const authToken = request.headers.authorization && request.headers.authorization.slice(7);
    if(!authToken) {
        new ResponseTrait(request, response).unautharizedResponse();
        callback(new Error("unautharized error"));
    }
        readFile("./Users.json", (error, fileData) => {
            if (error) {
                new ResponseTrait(request, response).serverErrorResponse("an error occorded while getting the data");
                callback(new Error("an error occorded while getting the data"));
            }
    
            fileData = JSON.parse(fileData.toString());
            const USER = fileData.find(async (user) => user.token == authToken);
            if(USER == -1) {
                new ResponseTrait(request, response).unautharizedResponse();
                callback(new Error("unautharized error"));
            } else {
                request.user = USER;
                callback(null);
            }
        });
}