import AuthController from "./controllers/authController.mjs";

export default function router (request, response){
    switch (request.url.slice(1)) {
        case "registerForm" :
            new AuthController(request,response).getRegisterForm();
            break;

        case "register":
            new AuthController(request,response).register();
            break;

        default :
        response.end(responseTrait);
    }
}