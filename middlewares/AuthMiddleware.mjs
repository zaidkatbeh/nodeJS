import ResponseTrait from "../responseTrait.mjs";

export default async function  AuthMiddleware (request, response){
    const authToken = request.headers.authorization && request.headers.authorization.slice(7);
    if(!authToken) {
        new ResponseTrait(request, response).unautharizedResponse();
        return -1;
    }
        readFile("./Users.json", (error, fileData) => {
            if (error) {
                return -1;
            }
    
            fileData = JSON.parse(fileData.toString());
            const USER = fileData.find(async (user) => user.token == authToken);
            if(USER == -1) {
                return -1;
            } else {
                request.user = USER;
                return 1;
            }
        });
}